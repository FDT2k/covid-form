
import {CONFIGURE_CLIENT} from './actions'
import {updateObject} from '../utils/reducer-utils'

const initialState = {
  configured:false
}

export default (state=initialState,action)=>{
  switch(action.type){

    case CONFIGURE_CLIENT:
      return updateObject(state,{...action.payload,configured:true})
    default:
      return state;
  }
  return state;
}
