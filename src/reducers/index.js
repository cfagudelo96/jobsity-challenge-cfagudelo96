import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";

import clips from './clips';
import selectedClip from './selectedClip';
import clipForm from './clipForm';
import nextClipId from './nextClipId';
import video from './video';

const clipapp = combineReducers({
  clips,
  selectedClip,
  clipForm,
  nextClipId,
  video,
  form: formReducer
});

export default clipapp;
