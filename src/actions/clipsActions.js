export const CREATE_CLIP = 'CREATE_CLIP';
export const UPDATE_CLIP = 'UPDATE_CLIP';
export const DELETE_CLIP = 'DELETE_CLIP';
export const SELECT_CLIP = 'SELECT_CLIP';
export const PLAY_PREVIOUS_CLIP = 'PLAY_PREVIOUS_CLIP';
export const PLAY_NEXT_CLIP = 'PLAY_NEXT_CLIP';

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

export const selectClip = clipId => ({
  type: SELECT_CLIP,
  payload: clipId,
});

export const playPreviousClip = clipId => ({
  type: PLAY_PREVIOUS_CLIP,
  payload: null
});

export const playNextClip = clipId => ({
  type: PLAY_NEXT_CLIP,
  payload: null
});
