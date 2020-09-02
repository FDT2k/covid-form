import {ADD_GUEST,DEL_GUEST,UPDATE_GUEST} from './actions'
import {add,delByPropId,updateListIfPropEqual} from '../utils/reducer-utils'

import guest from './item'

const initialState = [


]

export default (state=initialState,action)=>{
    switch (action.type){
      case ADD_GUEST:
        return add(state,guest({},action))
      break;
      case DEL_GUEST:
        return delByPropId(state,action.payload)
      break;
      case UPDATE_GUEST:
        if(!action.payload.id)
          return state;
        return updateListIfPropEqual('id',action.payload.id,state, x=> guest(x,action))
      break;
    }

    return state
}
