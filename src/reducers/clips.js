import _ from 'lodash';
import { CREATE_CLIP, DELETE_CLIP, UPDATE_CLIP } from '../actions';

const clips = (state = { }, action) => {
  switch (action.type) {
    case CREATE_CLIP:
      const newClip = action.payload;
      return { ...state, [newClip.id]: newClip };
    case UPDATE_CLIP:
      const { id, clip } = action.payload;
      return { ...state, [id]: clip };
    case DELETE_CLIP:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default clips;
