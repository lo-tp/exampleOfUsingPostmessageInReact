import { SET_HEIGHT, SET_SCROLL_TOP } from './action';

const initialState = {
  scrollTop: 0,
  height: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCROLL_TOP:
      return { ...state, scrollTop: action.arg };
    case SET_HEIGHT:
      return { ...state, height: action.arg };
    default:
      return state;
  }
};

export default reducer;
