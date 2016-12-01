export const SET_SCROLL_TOP = 'SET_SCROLL_TOP';
export const SET_HEIGHT = 'SET_HEIGHT';

export const setHeight = (height) => (
  {
    type: SET_HEIGHT,
    arg:height,
  }
);

export const setScrollTop = (scrollTop) => (
  {
    type: SET_SCROLL_TOP,
    arg:scrollTop,
  }
);
