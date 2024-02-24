const initialState = {
    selectedVideos: []
  };
  
  const videoReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_VIDEO':
        return {
          ...state,
          selectedVideos: [...state.selectedVideos, action.payload]
        };
      default:
        return state;
    }
  };
  
  export default videoReducer;