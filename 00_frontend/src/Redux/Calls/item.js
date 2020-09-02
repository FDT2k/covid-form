import {updateObject,addUniq} from '../utils/reducer-utils'


import {PEER_CALLING,ANSWER_CALL,DISCARD_CALL,PEER_MC_CLOSED,PEER_MC_ERROR} from '../actions'


const initialState = {
  connection_id: null,
  peer: null,
  status: "ringing",
  conn:null
}

export default (state=initialState,action)=>{
    switch (action.type){
      case PEER_CALLING:
        return updateObject(initialState,{
            connection_id:action.payload.connectionId,
            peer: action.payload.peer,
            conn: action.payload
        })
      break;
    }

    return state
}
