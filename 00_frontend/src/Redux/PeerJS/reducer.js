import {PEERJS_REGISTERED,PEERJS_ERROR,PEERJS_CONNECTED} from '../PeerJS/actions'
import {updateProp} from '../utils/reducer-utils'

import PeerJSStatus  from './status'

const initialState = {
    myPeerId:undefined,
    status:PeerJSStatus(undefined,{type:undefined})
}

export default (state=initialState,action)=>{
    switch (action.type){
      case PEERJS_REGISTERED:

        return updateProp('myPeerId',state,action.payload)
      break;
      case PEERJS_CONNECTED:
      
      case PEERJS_ERROR:

        return {
          ...state,
          status: PeerJSStatus(state.status,action)
        }
      break;

    }

    return state
}
