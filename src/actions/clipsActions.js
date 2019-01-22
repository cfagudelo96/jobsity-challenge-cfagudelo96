export const CREATE_CLIP = 'CREATE_CLIP';
export const UPDATE_CLIP = 'UPDATE_CLIP';
export const DELETE_CLIP = 'DELETE_CLIP';

export const createClip = clip => ({
  type: CREATE_CLIP,
  payload: clip
});

export const updateClip = (clipId, clip) => ({
  type: UPDATE_CLIP,
  payload: {
    id: clipId,
    clip
  },
});

export const deleteClip = clipId => ({
  type: DELETE_CLIP,
  payload: clipId
});
