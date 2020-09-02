import {PEER_CALLING,ANSWER_CALL,DISCARD_CALL,PEER_MC_CLOSED,PEER_MC_ERROR} from '../Session/actions'
import {addUniqByProp,delByProp} from '../utils/reducer-utils'

import item from './item'

const initialState = [
  
]

export default (state=initialState,action)=>{
  console.log(action)
    switch (action.type){

      case PEER_CALLING:
        return addUniqByProp('connection_id', state,item(undefined,action))
      break;
      case DISCARD_CALL:
        return delByProp('connection_id',state,action.payload)
      break;
      case PEER_MC_CLOSED:
        return delByProp('connection_id',state,action.payload.peer.connectionId)
      break;
      case PEER_MC_ERROR:
        return delByProp('connection_id',state,action.payload.peer.connectionId)
      break;
    }

    return state
}
