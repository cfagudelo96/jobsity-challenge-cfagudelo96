import { CLOSE_CLIP_FORM, OPEN_EDIT_CLIP_FORM, OPEN_NEW_CLIP_FORM } from '../actions/clipFormActions';

const clipForm = (state = { showing: false }, action) => {
  switch (action.type) {
    case OPEN_NEW_CLIP_FORM:
      return {
        showing: true
      };
    case OPEN_EDIT_CLIP_FORM:
      return {
        showing: true,
        clipId: action.payload
      };
    case CLOSE_CLIP_FORM:
      return {
        showing: false
      };
    default:
      return state;
  }
};

export default clipForm;
