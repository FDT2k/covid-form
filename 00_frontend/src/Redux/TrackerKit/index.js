
import {GENERATE_TRACKER_ID } from 'Redux/TrackerKit/actions'
import { combineReducers } from 'redux'


export const STATUS = {
  IDLE:0,
  WORKING:1,
  COMPLETE:2,
  ERROR:4
}

const initialState =
{
  status: STATUS.IDLE,
  key_generated:false,
  tracker_created:false,
}
 
const KitStatusReducer  = (state = initialState, action) => {
  switch (action.type) {
   
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