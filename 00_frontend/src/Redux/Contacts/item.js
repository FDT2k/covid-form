import {updateObject,addUniq,del} from '../utils/reducer-utils'




import {PEER_JOINED,PEER_CLOSED,RECEIVE,SEND,RECONCILIATE_STATUS} from '../actions'
import {ADD_GUEST} from '../Guests/actions';


const initialState = {
  identifier:null,
  remotePeerId: null,
  status:'invited',
  activePeers:[],
  log:[]
}

export default (state=initialState,action)=>{
    switch (action.type){
      case ADD_GUEST:
        return updateObject(initialState,{identifier:action.payload.id})
      break;

      case PEER_JOINED:

          return updateObject(state,{
            identifier:action.payload.metadata.identifier,
            remotePeerId: action.payload.peer,
            status:'online',
            activePeers:[...addUniq(state.activePeers,action.payload.peer)]
          }
        )
      break;
      case PEER_CLOSED:

          return updateObject(state,{
            identifier:action.payload.metadata.identifier,
            remotePeerId: action.payload.peer,
            status:'offline',
            activePeers:[...del(state.activePeers,action.payload.peer)]
          }
        )
      break;
      case RECEIVE:
        return updateObject(state,{
            ...state,
            log:[...state.log,action.payload]
        })
      break;
      case SEND:
        return updateObject(state,{
            ...state,
            log:[...state.log,action.payload]
        })
      break;
      case RECONCILIATE_STATUS:
        return updateObject(state,{
          ...state,
          status:action.payload.status
        })
      break;
    }

    return state
}
