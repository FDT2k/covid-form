import create from '../utils/make-action'


export const PEERJS_REGISTERED ='PEERJS_REGISTERED'
export const PEERJS_ERROR ='PEERJS_ERROR'
export const PEERJS_CONNECTED ='PEERJS_CONNECTED'

export const peerjs_registered      = create(PEERJS_REGISTERED);
export const peerjs_error           =  create(PEERJS_ERROR);
export const peerjs_connected       =  x=> create(PEERJS_CONNECTED,x);
