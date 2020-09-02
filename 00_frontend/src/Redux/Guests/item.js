import {updateObject} from '../utils/reducer-utils'

import {ADD_GUEST,UPDATE_GUEST} from './actions'


const initialState = {
  name:'',
  phone:'',
  email:'',
}

export default (state=initialState,action)=>{
    switch (action.type){
      case ADD_GUEST:
        const guest = {...action.payload}
        return updateObject(initialState,guest)
      break;
      case UPDATE_GUEST:
        return updateObject(state,action.payload)
      break;
    }

    return state
}
