import {PEER_JOINED,PEER_CLOSED,RECEIVE,SEND,RECONCILIATE_STATUS} from '../Session/actions'
import {ADD_GUEST} from '../Guests/actions';
import {add,delByProp,addUniqByProp,updateObject,updateProp} from '../utils/reducer-utils'


import reconcileItem from './item'


const initialState = {


}


export default (state=initialState,action)=>{
    switch (action.type){
      case ADD_GUEST:
        return updateObject(state,{[action.payload.id]: reconcileItem(state[action.payload.id],action)});
      break;
      case PEER_JOINED:
        return updateProp(action.payload.metadata.identifier,state,reconcileItem(state[action.payload.metadata.identifier],action))
      break;
      case PEER_CLOSED:
        return updateProp(action.payload.metadata.identifier,state,reconcileItem(state[action.payload.metadata.identifier],action))
      break;
      case RECEIVE:
        
      case SEND:
        return state[action.payload.identifier] ? updateProp(action.payload.identifier,state,reconcileItem(state[action.payload.identifier],action)) : state
      break;
      case RECONCILIATE_STATUS:
        return updateProp(action.payload.identifier,state,reconcileItem(state[action.payload.identifier],action))
      break;
    }
    return state
}
