export const SET_SELECT_VIDEO = 'SET_SELECTED_VIDEO';

export const setSelectedVideo = (videourl) => ({
    type: SET_SELECT_VIDEO,
    payload: videourl
});