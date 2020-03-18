import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeModalLogin, setModalREGISTER } from '../../actions/modal';
import {
  Button,
  Avatar,
  Typography,
  TextField,
  Grid,
  Dialog,
  DialogContent,
  Slide,
  Link
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../../palette/Classes';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ModalLogin = ({ removeModalLogin, setModalREGISTER, isOpenLogin }) => {
  const classes = useStyles();

  const openRegister = () => {
    removeModalLogin();
    setModalREGISTER();
  };

  return (
    <div>
      <Dialog
        open={isOpenLogin}
        onClose={removeModalLogin}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogContent className={classes.modal}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container style={{ marginBottom: '1rem' }}>
                <Grid item>
                  <Link
                    variant="body2"
                    className={classes.link}
                    onClick={openRegister}
                  >
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

ModalLogin.propTypes = {
  removeModalLogin: PropTypes.func.isRequired,
  setModalREGISTER: PropTypes.func.isRequired,
  isOpenLogin: PropTypes.bool
};

const mapStateToProps = state => ({
  isOpenLogin: state.modal.isOpenLogin
});

export default connect(mapStateToProps, { removeModalLogin, setModalREGISTER })(
  ModalLogin
);
