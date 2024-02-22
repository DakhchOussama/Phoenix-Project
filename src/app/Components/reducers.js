import { SET_SELECTED_VIDEO } from './actions';

const initialState = {
    selectedVideo: null
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_VIDEO:
            return {
                ...state,
                selectedVideo: action.payload
            };
        default:
            return state;
    }
}

export default rootReducer;