import { SET_MODAL, REMOVE_MODAL } from '../reducers/types';

export const setModal = () => dispatch => {
  dispatch({
    type: SET_MODAL
  });
};

export const removeModal = () => dispatch => {
  dispatch({
    type: REMOVE_MODAL
  });
};
