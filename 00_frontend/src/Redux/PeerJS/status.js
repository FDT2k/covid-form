import {PEERJS_REGISTERED,PEERJS_ERROR,PEERJS_CONNECTED} from './actions'
import {updateProp} from '../utils/reducer-utils'


const initialState = {
  connected:false,
  error: null,
  error_type:null
}

export default (state=initialState,action)=>{
    switch (action.type){

      case PEERJS_CONNECTED:
        return updateProp('connected',state,true)
      break;
      case PEERJS_ERROR:
        if(!action.payload.error)
          return {
            ...state,
            connected:false,
            error: 'unknown error',
            error_type: 'unkown'
          };

        return {
          ...state,
          connected:action.payload.error.type !=="network" && action.payload.error.type !=="unavailable-id" ,
          error:action.payload.error.toString(),
          error_type:action.payload.error.type
        }
      break;

    }

    return state
}
