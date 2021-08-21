import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ auth }) => {
  console.log('My auth status is ', auth);

  const authButton = auth
    ? <a href='/api/logout'>Logout</a>
    : <a href='/api/auth/google'>Login</a>;

  return (
    <div>
      <Link to='/'>React SSR</Link>
      <div>
        <Link to='/users'>Users</Link>
        <Link to='/admins'>Admins</Link>
        {authButton}
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(Header);
