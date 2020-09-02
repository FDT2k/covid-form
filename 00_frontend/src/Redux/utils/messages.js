import {assign2,curry,compose} from '@geekagency/composite-js'
import uid from 'uid'

export const MESSAGE_STATUS = {
    CREATED: 0,
    SENT: 1,
    ACK: 2, // message received
    READ: 4, // message has been read

}
export const MESSAGE_TYPE = {
    UNKNOWN: 0,
    TEXT: 1,
    FILE: 2,
}

export const MESSAGE_SIDE = {
    SYSTEM: 0,
    INCOMING: 1,
    OUTGOING: 2,
}

/*{
    identifier:payload.identifier,
    to:payload.peer,
    date_sent:Date.now() / 1000 | 0,
    ...payload
  } */



export const create_message_type_text = (payload)=>(
    {
        status: MESSAGE_STATUS.CREATED,
        message: `${payload}`,
        type: MESSAGE_TYPE.TEXT,
    }
)

export const message_incoming =  message => assign2(message,{side:MESSAGE_SIDE.INCOMING})
export const message_outgoing =  message => assign2(message,{side:MESSAGE_SIDE.OUTGOING})

export const message_received_date =  message => assign2(message,{date_received:Date.now() / 1000 | 0})
export const message_sent_date =  message => assign2(message,{date_sent:Date.now() / 1000 | 0})

export const message_from = curry((from,message) => assign2(message,{ from }))
export const message_to = curry((to,message) => assign2(message,{ to }))

export const message_uid = message=> assign2(message,{id:uid()})

export const message_sender_identifier = curry((identifier,message) => assign2(message,{ identifier }))
export const default_incoming_message_organiser = (identifier)=> compose(message_sender_identifier(identifier))
export const default_incoming_message = (from)=> compose(message_received_date,message_incoming,message_from(from))

export const message_status_sent = message => assign2(message,{status:MESSAGE_STATUS.SENT})

export const stamp_incoming_organiser = (identifier,payload) =>  default_incoming_message_organiser(identifier)(payload)
export const stamp_incoming= (from,payload) =>  default_incoming_message(from)(payload)


export const default_outgoing = (to)=> compose(message_sent_date,message_uid,message_outgoing,message_to(to))

export const stamp_outgoing= (to,payload) =>  default_outgoing(to)(payload)
export const stamp_outgoing_organiser= (identifier,payload) =>  message_sender_identifier(identifier)(payload)
export const stamp_rtc= message_status_sent;
