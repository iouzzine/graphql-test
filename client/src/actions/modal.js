import {
  SET_MODAL_LOGIN,
  SET_MODAL_REGISTER,
  REMOVE_MODAL_LOGIN,
  REMOVE_MODAL_REGISTER
} from '../reducers/types';

export const setModalLogin = () => dispatch => {
  dispatch({
    type: SET_MODAL_LOGIN
  });
};

export const removeModalLogin = () => dispatch => {
  dispatch({
    type: REMOVE_MODAL_LOGIN
  });
};

export const setModalREGISTER = () => dispatch => {
  dispatch({
    type: SET_MODAL_REGISTER
  });
};

export const removeModalREGISTER = () => dispatch => {
  dispatch({
    type: REMOVE_MODAL_REGISTER
  });
};
