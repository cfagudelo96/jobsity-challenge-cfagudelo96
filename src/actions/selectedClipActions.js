export const SELECT_CLIP = 'SELECT_CLIP';

export const selectClip = clipId => ({
  type: SELECT_CLIP,
  payload: clipId,
});
