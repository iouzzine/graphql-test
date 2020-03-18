import { LOGIN_SUCCESS } from '../reducers/types';

export const setLogin = (data, err = false) => async dispatch => {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data.login
  });
};
