
import {STATUS,KIT_GENERATION_STARTED,KIT_GENERATION_SUCCESS,GENERATE_TRACKER_ID,REMOTE_TRACKER_CREATION_BEGAN,REMOTE_TRACKER_CREATION_SUCCESS,REMOTE_TRACKER_CREATION_FAILURE } from 'Redux/TrackerKit/actions'
import { combineReducers } from 'redux'


const initialState =
{
  status: STATUS.IDLE,
  key_generated:STATUS.IDLE,
  tracker_created:STATUS.IDLE,
}
 
const KitStatusReducer  = (state = initialState, action) => {
  switch (action.type) {
    case KIT_GENERATION_STARTED:
      return {
        ...state,
        status:STATUS.WORKING
      }
    break;
    case KIT_GENERATION_SUCCESS:
      return {
        ...state,
        status:STATUS.COMPLETE
      }
    break;
    case REMOTE_TRACKER_CREATION_BEGAN:
      return {
        ...state,
        tracker_created:STATUS.WORKING,
      }
    break; 
    case REMOTE_TRACKER_CREATION_SUCCESS:
      return {
        ...state,
        tracker_created:STATUS.COMPLETE,
      }
    break; 
    case REMOTE_TRACKER_CREATION_FAILURE:
      return {
        ...state,
        tracker_created:STATUS.ERROR,
      }
    break; 
  }

  return state
}


const TrackerIdReducer = (state = {tracker_id:null},action)=> {
  switch (action.type){
    case GENERATE_TRACKER_ID: 
      return {...state,tracker_id:action.payload}
    break;

  } 

  
  return state;
}

export default combineReducers({
  ecov:KitStatusReducer,
  tracker: TrackerIdReducer
})