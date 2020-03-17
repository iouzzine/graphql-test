import { SET_MODAL, REMOVE_MODAL } from './types';

const initalState = {
  isOpen: false
};

export default (state = initalState, action) => {
  const { type } = action;

  switch (type) {
    case SET_MODAL:
      return {
        isOpen: true
      };
    case REMOVE_MODAL:
      return {
        isOpen: false
      };
    default:
      return state;
  }
};
