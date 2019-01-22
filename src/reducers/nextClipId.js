import { CREATE_CLIP } from '../actions';

const nextClipId = (state = 1, action) => {
  switch (action.type) {
    case CREATE_CLIP:
      return state + 1;
    default:
      return state;
  }
};

export default nextClipId;
