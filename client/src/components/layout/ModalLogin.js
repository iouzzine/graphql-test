import React, { forwardRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { removeModal } from '../../actions/modal';
import {
  Button,
  Avatar,
  Typography,
  TextField,
  Grid,
  Dialog,
  DialogContent,
  Slide,
  Link as Mlink
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from '../../palette/Classes';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});

const ModalLogin = ({ removeModal, isOpen }) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={removeModal}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}
      >
        <DialogContent>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
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
                <Grid item xs>
                  <Mlink
                    component={Link}
                    to="/forget"
                    variant="body2"
                    className={classes.link}
                  >
                    Forgot password?
                  </Mlink>
                </Grid>
                <Grid item>
                  <Mlink
                    component={Link}
                    to="/register"
                    variant="body2"
                    className={classes.link}
                  >
                    Don't have an account? Sign Up
                  </Mlink>
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
  removeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool
};

const mapStateToProps = state => ({
  isOpen: state.modal.isOpen
});

export default connect(mapStateToProps, { removeModal })(ModalLogin);
