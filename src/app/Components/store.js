import { createStore, combineReducers } from 'redux';
import videoReducer from './reducers/videoReducer';

const rootReducer = combineReducers({
  video: videoReducer
});

const store = createStore(rootReducer);

export default store;