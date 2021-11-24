import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import { API_URL } from './client/constants';

const app = express();

app.use(
  '/api',
  proxy(API_URL, {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    }
  },
));
app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore(req);

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises)
    .then(() => {
      const context = {};
      const content = renderer(req, store, context);

      if(context.notFound) {
        res.status(404);
      }

      res.send(content);
    }).catch(() => {
      res.send('Something went wrong');
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});