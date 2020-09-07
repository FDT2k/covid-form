
import {spec} from '@geekagency/composite-js/ObjectUtils'

const TOPIC = process.env.TOPIC || 'covid-tracker'


const Joi = require('joi');

const schema = Joi.object({
   tracker_id: Joi.string()
        .pattern(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
        .required(),
   pub_key: Joi.string().required(),
   event_date: Joi.string().required()
})

export const get_tracker = broker=>  context => {
   return broker.call('covid-store.get',{tracker_id:context.payload.tracker_id})
}


export const get_pubkey = broker=>  context => {

    return get_tracker(broker)(context).then(result=>{
        const payload = {pub_key:result.payload.entity.pub_key}
        return context.next(payload)

    })
}

export const register = broker => context => {
    console.log(context.payload)
    const {tracker_id, data} = context.payload;
    const q = {
        filter: {tracker_id},
        data: {"$push":{"registrations":data}}
    }

    return broker.call('covid-store.update',q);

    /*covid-tracker.register */
}

export const create_tracker = broker=> context => {
    Joi.assert(context.payload,schema);
    const {tracker_id,pub_key,event_date} = context.payload;

    return broker.call('covid-store.get',{tracker_id}).then(res => {
    
        const {entity} = res.payload

        if(entity === null){
            return broker.call('covid-store.insert',{tracker_id,pub_key,event_date}).then( create_res => {
                console.log(create_res.payload)
                return context.next('tracker created')
            })
        }else{
            return new Error('Tracker already exists')
        }
    })
}



const fns = {

    [`${TOPIC}.get`]:get_tracker,
    [`${TOPIC}.create`]:create_tracker,
    [`${TOPIC}.get-public-key`]:get_pubkey,
    [`${TOPIC}.register`]:register
}



export default (broker) => {
   
    broker.subscribeAll(spec(fns,broker))
  
}