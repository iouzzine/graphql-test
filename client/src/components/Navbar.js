import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setModal } from '../actions/modal';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import ModalLogin from './layout/ModalLogin';

// Styles
import useStyles from '../palette/Classes';

const Navbar = ({ setModal, isOpen }) => {
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
          <Button
            color="inherit"
            style={{ marginRight: '0.5rem' }}
            onClick={setModal}
          >
            Login
          </Button>
          <Button color="inherit" style={{ marginRight: '1rem' }}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
      {isOpen && <ModalLogin />}
    </>
  );
};

Navbar.propTypes = {
  setModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool
};

const mapStateToProps = state => ({
  isOpen: state.modal.isOpen
});

export default connect(mapStateToProps, { setModal })(Navbar);
