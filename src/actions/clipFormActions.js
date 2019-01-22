export const OPEN_NEW_CLIP_FORM = 'OPEN_NEW_CLIP_FORM';
export const OPEN_EDIT_CLIP_FORM = 'OPEN_EDIT_CLIP_FORM';
export const CLOSE_CLIP_FORM = 'CLOSE_CLIP_FORM';

export const openNewClipForm = () => ({
  type: OPEN_NEW_CLIP_FORM,
  payload: null
});

export const openEditClipForm = clipId => ({
  type: OPEN_EDIT_CLIP_FORM,
  payload: clipId
});

export const closeClipForm = () => ({
  type: CLOSE_CLIP_FORM,
  payload: null
});
