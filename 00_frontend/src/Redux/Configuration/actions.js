import {curry} from '@geekagency/composite-js'
import create from '../utils/make-action'
// defining actions.
export const CONFIGURE              = 'CONFIGURE';
export const LOAD_CONFIG            = 'LOAD_CONFIG';
export const GEN_SALT               = 'GEN_SALT';


export const configure = payload => {

  return {
    type:CONFIGURE,
    payload: {
      configured:true,

      identity:{
        name:payload.organiser_name
      },

      config:{
        host:payload.server,
        key: payload.key,
        port: payload.port,
        secure:payload.secure
      }

    }
  }

}
