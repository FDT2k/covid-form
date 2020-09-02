
import {GENERATE_PRIVATE_KEY_SUCCESS,GENERATE_PRIVATE_KEY_BEGAN,GENERATE_PRIVATE_KEY_FAILURE} from 'Redux/Keys/actions'


const initialState = {key:null,status:'idle'}

export default (state=initialState,action)=>{
    switch (action.type){
      case GENERATE_PRIVATE_KEY_BEGAN:
        return {...state,status:'generating'}
      break;
      case GENERATE_PRIVATE_KEY_SUCCESS:
        return {...state,key:action.payload,status:'idle'}
      break;
      case GENERATE_PRIVATE_KEY_FAILURE:
        return {...state,status:'idle'}

      break;
    }

    return state
}
