import {RECEIVE,SEND} from '../Session/actions'

import {add,delByProp,addUniqByProp,updateObject,updateProp} from '../utils/reducer-utils'

const initialState = {
    log: [],
}



export default (state=initialState,action)=>{
  switch (action.type){
    case RECEIVE:
      return {
        ...state,
        log: add(state.log,action.payload)
      }
    break;
    case SEND:
      return {
        ...state,
        log: add(state.log,action.payload)
      }
    break;
  }

  return state
}
