import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeModalREGISTER, setModalLogin } from '../../actions/modal';
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

const ModalRegister = ({
  removeModalREGISTER,
  setModalLogin,
  isOpenRegister
}) => {
  const classes = useStyles();

  const openLogin = () => {
    removeModalREGISTER();
    setModalLogin();
  };

  return (
    <div>
      <Dialog
        open={isOpenRegister}
        onClose={removeModalREGISTER}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogContent className={classes.modal}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
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
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confPassword"
                label="Password Confimation"
                type="password"
                id="confirmPassword"
                autoComplete="confirmPwd"
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
                    onClick={openLogin}
                  >
                    Already have an account? Sign in
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

ModalRegister.propTypes = {
  removeModalRegister: PropTypes.func,
  setModalLogin: PropTypes.func,
  isOpenRegister: PropTypes.bool
};

const mapStateToProps = state => ({
  isOpenRegister: state.modal.isOpenRegister
});

export default connect(mapStateToProps, { removeModalREGISTER, setModalLogin })(
  ModalRegister
);
