import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";

import clips from './clips';
import clipForm from './clipForm';
import video from './video';

const clipapp = combineReducers({
  clips,
  clipForm,
  video,
  form: formReducer
});

export default clipapp;
