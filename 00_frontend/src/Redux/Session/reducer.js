import {PEER_JOINED,PEER_CLOSED,RECEIVE,SEND,RECONCILIATE_STATUS} from './actions'
import {ADD_GUEST,DEL_GUEST} from '../Guests/actions';

import Guests from '../Guests/list'
import Contacts from '../Contacts/list'

const initialState = {
    guests: [],
    peers: [],
    reconciliated: {},
}

export default (state=initialState,action)=>{
    switch (action.type){

      case ADD_GUEST:
        return {
          ...state,
          guests: Guests(state.guests,action),
          reconciliated: Contacts(state.reconciliated,action)
        }
      break;
      case PEER_JOINED:
      case PEER_CLOSED:
        return {
          ...state,
          reconciliated: Contacts(state.reconciliated,action)
        }
      break;
      case RECEIVE:
        return {
          ...state,
          reconciliated: Contacts(state.reconciliated,action)
        }
      break;
      case SEND:
        return {
          ...state,
          reconciliated: Contacts(state.reconciliated,action)
        }
      break;
      case RECONCILIATE_STATUS:
      return {
        ...state,
        reconciliated: Contacts(state.reconciliated,action)
      }
      break;
    }

    return state
}
