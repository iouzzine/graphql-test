import React, { forwardRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { userRegister } from '../../graphQL/Mutations/auth.mutation';
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

  const [registerUser] = useMutation(userRegister);

  const openLogin = () => {
    removeModalREGISTER();
    setModalLogin();
  };

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: ''
  });

  const { email, username, password, passwordConfirm } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    registerUser({
      variables: {
        email,
        username,
        password,
        passwordConfirm
      }
    }).then(res => {
      console.log('res -->', res);
      openLogin();
    });
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
            <form className={classes.form} onSubmit={e => onSubmit(e)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                id="username"
                value={username}
                onChange={e => onChange(e)}
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
                value={email}
                onChange={e => onChange(e)}
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
                value={password}
                onChange={e => onChange(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Password Confimation"
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={e => onChange(e)}
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
                    id="loginLink"
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
