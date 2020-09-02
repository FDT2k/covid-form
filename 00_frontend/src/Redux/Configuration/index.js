
import {CONFIGURE,LOAD_CONFIG} from './actions'
import {updateObject} from '../utils/reducer-utils'

const initialState = {
  configured: false,
  sessions: [],
  identity: {},
  salt:'',
  config:{}
}

export default (state=initialState,action)=>{
  switch(action.type){

    case CONFIGURE:
      return updateObject(state,action.payload)
    default:
      return state;
  }
  return state;
}
