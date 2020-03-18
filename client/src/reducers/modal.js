import {
  SET_MODAL_LOGIN,
  SET_MODAL_REGISTER,
  REMOVE_MODAL_LOGIN,
  REMOVE_MODAL_REGISTER
} from '../reducers/types';

const initalState = {
  isOpenLogin: false,
  isOpenRegister: false
};

export default (state = initalState, action) => {
  const { type } = action;

  switch (type) {
    case SET_MODAL_LOGIN:
      return {
        isOpenLogin: true
      };
    case REMOVE_MODAL_LOGIN:
      return {
        isOpenLogin: false
      };
    case SET_MODAL_REGISTER:
      return {
        isOpenRegister: true
      };
    case REMOVE_MODAL_REGISTER:
      return {
        isOpenRegister: false
      };
    default:
      return state;
  }
};
