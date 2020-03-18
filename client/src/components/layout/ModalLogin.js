import React, { forwardRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { removeModalLogin, setModalREGISTER } from '../../actions/modal';
import { setLogin } from '../../actions/auth';
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

const userLogin = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      email
      username
      token
    }
  }
`;

const ModalLogin = ({
  removeModalLogin,
  setModalREGISTER,
  setLogin,
  isOpenLogin
}) => {
  const classes = useStyles();

  const [loginUser] = useMutation(userLogin);

  const openRegister = () => {
    removeModalLogin();
    setModalREGISTER();
  };

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    loginUser({
      variables: {
        username,
        password
      }
    }).then(res => {
      setLogin(res.data);
      removeModalLogin();
    });
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
                name="password"
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={e => onChange(e)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                id="buttonLogin"
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
                    id="registerLink"
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
  setLogin: PropTypes.func.isRequired,
  isOpenLogin: PropTypes.bool
};

const mapStateToProps = state => ({
  isOpenLogin: state.modal.isOpenLogin
});

export default connect(mapStateToProps, {
  removeModalLogin,
  setModalREGISTER,
  setLogin
})(ModalLogin);
