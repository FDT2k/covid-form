import {PEER_JOINED,PEER_CLOSED,PEER_ERROR} from '../Session/actions'
import {updateObject,updateProp} from '../utils/reducer-utils'

import {delFromObjectByKey} from '@geekagency/composite-js/ReduxUtils'
const initialState = {

}

export default (state=initialState,action)=>{
    switch (action.type){

      case PEER_JOINED:
        return updateProp(action.payload.peer,state,action.payload)
      break;
      case PEER_CLOSED:
        //return updateProp(action.payload.peer,state,action.payload)
        return delFromObjectByKey(action.payload.peer,state)
      break;
    }

    return state
}
