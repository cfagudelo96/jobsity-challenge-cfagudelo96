import _ from 'lodash';
import { CREATE_CLIP, UPDATE_CLIP, DELETE_CLIP, SELECT_CLIP, PLAY_PREVIOUS_CLIP, PLAY_NEXT_CLIP } from '../actions';

const defaultClipsState = {
  ids: [],
  entities: { },
  selectedClipId: 0,
  nextClipId: 1
};

const getSelectedClipIdIndex = (state) => {
  return _.findIndex(state.ids, (id) => id === state.selectedClipId);
};

const clips = (state = defaultClipsState, action) => {
  switch (action.type) {
    case CREATE_CLIP:
      const newClip = action.payload;
      return {
        ids: [...state.ids, newClip.id],
        entities: { ...state.entities, [newClip.id]: newClip },
        nextClipId: state.nextClipId + 1,
        selectedClipId: newClip.id
      };
    case UPDATE_CLIP:
      const { id, clip } = action.payload;
      return {
        ...state,
        entities: { ...state.entities, [id]: clip },
        selectedClipId: id
      };
    case DELETE_CLIP:
      const ids = _.remove(state.ids, (id) => id === action.payload);
      const selectedClipId = state.selectedClipId === action.payload ? 0 : state.selectedClipId;
      const entities = _.omit(state.entities, action.payload);
      return {
        ...state,
        ids: ids,
        entities: entities,
        selectedClipId: selectedClipId
      };
    case SELECT_CLIP:
      return { ...state, selectedClipId: action.payload };
    case PLAY_PREVIOUS_CLIP:
      if (getSelectedClipIdIndex(state) === 0) {
        return state;
      } else {
        return { ...state, selectedClipId: getSelectedClipIdIndex(state) - 1 };
      }
    case PLAY_NEXT_CLIP:
      if (getSelectedClipIdIndex(state) === state.ids.length - 1) {
        return state;
      } else {
        return { ...state, selectedClipId: state.ids[getSelectedClipIdIndex(state) + 1] };
      }
    default:
      return state;
  }
};

export default clips;
