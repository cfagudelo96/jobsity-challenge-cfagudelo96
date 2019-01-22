import { DELETE_CLIP, SELECT_CLIP } from '../actions';

const selectedClip = (state = 0, action) => {
  switch (action.type) {
    case SELECT_CLIP:
      return action.payload;
    case DELETE_CLIP:
      return state === action.payload ? 0 : state;
    default:
      return state;
  }
};

export default selectedClip;
