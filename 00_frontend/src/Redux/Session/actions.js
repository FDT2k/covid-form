import {compose} from '@geekagency/composite-js'
import create from '../utils/make-action'
import {stamp_incoming_organiser,stamp_incoming, stamp_outgoing,stamp_rtc,stamp_outgoing_organiser} from '../utils/messages'




export const PEER_JOINED ='PEER_JOINED'
export const PEER_CONNECTED ='PEER_CONNECTED'
export const PEER_ERROR ='PEER_ERROR'
export const PEER_DISCONNECTED ='PEER_DISCONNECTED'
export const PEER_CLOSED ='PEER_CLOSED'
export const PEER_CALLING ='PEER_CALLING'
export const PEER_MC_CLOSED ='PEER_MC_CLOSED'
export const PEER_MC_ERROR ='PEER_MC_ERROR'
export const PEER_MC_STREAM ='PEER_MC_STREAM'

export const ANSWER_CALL ='ANSWER_CALL'
export const DISCARD_CALL ='DISCARD_CALL'
export const VIDEO_CALL = 'VIDEO_CALL'

export const STATUS_ONLINE ='online';
export const STATUS_INVITED ='invited';
export const STATUS_DISCONNECTED ='disconnected';

export const RECEIVE = 'RECEIVE';
export const SEND = 'SEND';
export const RECONCILIATE_STATUS = 'RECONCILIATE_STATUS';

export const peer_joined        = create(PEER_JOINED);
export const peer_connected       = create(PEER_CONNECTED);
export const peer_error         = create(PEER_ERROR);
export const _peer_close         = create(PEER_CLOSED);
export const peer_calling       = create(PEER_CALLING);
export const peer_disconnected    = create(PEER_DISCONNECTED);
export const mc_close         = create(PEER_MC_CLOSED);
export const mc_error         = create(PEER_MC_ERROR);
export const mc_stream         = create(PEER_MC_STREAM);
export const answer_call       = create(ANSWER_CALL);
export const discard_call       = create(DISCARD_CALL);

export const reconciliate_status = create(RECONCILIATE_STATUS)


export const peer_close = payload=> {
  //resend the connection as a payload
  return (dispatch,getState)=>{
    const state= getState().peers[payload.peer];
    if ( state && state.peerConnection === null){
      return dispatch(_peer_close(state));
    }
  }

}

export const offline_all = ()=>{
  return (dispatch,getState)=>{
    let users = Object.keys(getState().session.reconciliated).map(
      user=>{
        dispatch(reconciliate_status({identifier:user,status:'offline'}))
      }
    )
  }
}

const findRelevantPeerId= (state,peer)=>{
  return Object.keys(state.session.reconciliated).reduce((acc,item)=>{
    for(let _peer of state.session.reconciliated[item].activePeers){
      if(peer === _peer){
        acc= item;
        break;

      }
    }
    return acc
  },undefined);
}

export const receive   =  ({peer,message}) => {
  return (dispatch,getState)=>{
    let identifier = findRelevantPeerId(getState(),peer);
    const payload =  stamp_incoming_organiser(identifier,message)

    dispatch(single_receive({peer,message:payload}))
  }
}


export const send   =  (rtc,{peer,message}) => {
  return (dispatch,getState)=>{

    let identifier = findRelevantPeerId(getState(),peer);
    const payload =  stamp_outgoing_organiser(identifier,message)

    dispatch(single_send(rtc,{peer,message:payload}))
  //return create(SEND,message);
  }
}


export const single_receive   = ({peer,message}) =>   create(RECEIVE ,stamp_incoming(peer,message) )




export const single_send   =  (rtc,{peer,message}) => {
  let payload = stamp_outgoing(peer,message);
  if(rtc){
    rtc(payload);
    payload = stamp_rtc(payload);
  }
  return create(SEND,payload)
};
