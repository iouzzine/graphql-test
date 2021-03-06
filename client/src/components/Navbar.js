import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setModalLogin, setModalREGISTER } from '../actions/modal';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import ModalLogin from './layout/ModalLogin';
import ModalRegister from './layout/ModalRegister';

// Styles
import useStyles from '../palette/Classes';

const Navbar = ({
  setModalLogin,
  setModalREGISTER,
  isOpenLogin,
  isOpenRegister,
  auth: { user, isAuthenticated }
}) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <Typography className={classes.titleflexGrow}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              className={classes.title}
            >
              GraphQL
            </Typography>
          </Typography>
          {!isAuthenticated ? (
            <>
              <Button
                color="inherit"
                style={{ marginRight: '0.5rem' }}
                onClick={setModalLogin}
                id="loginModal"
              >
                Login
              </Button>
              <Button
                color="inherit"
                style={{ marginRight: '1rem' }}
                onClick={setModalREGISTER}
                id="registerModal"
              >
                Register
              </Button>
            </>
          ) : (
            <Typography
              variant="h6"
              component={Link}
              to="/"
              className={classes.title}
            >
              username: {user.username}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      {isOpenLogin && <ModalLogin />}
      {isOpenRegister && <ModalRegister />}
    </>
  );
};

Navbar.propTypes = {
  setModalLogin: PropTypes.func.isRequired,
  setModalREGISTER: PropTypes.func.isRequired,
  isOpenLogin: PropTypes.bool,
  isOpenRegister: PropTypes.bool,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isOpenLogin: state.modal.isOpenLogin,
  isOpenRegister: state.modal.isOpenRegister,
  auth: state.auth
});

export default connect(mapStateToProps, { setModalLogin, setModalREGISTER })(
  Navbar
);
