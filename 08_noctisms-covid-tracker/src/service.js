
import {spec} from '@geekagency/composite-js/ObjectUtils'
import { create } from 'core-js/fn/object';

const TOPIC = process.env.TOPIC || 'covid-tracker'


const Joi = require('joi');

const schema = Joi.object({
   tracker_id: Joi.string()
        .pattern(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
        .required(),
   pub_key: Joi.string().required()
})

export const get_tracker = context => {

    
}


export const create_tracker = broker=> context => {
    Joi.assert(context.payload,schema);
    const {tracker_id,pub_key} = context.payload;

    return broker.call('covid-store.get',{tracker_id}).then(res => {
    
        const {entity} = res.payload

        if(entity === null){
            return broker.call('covid-store.insert',{tracker_id,pub_key}).then( create_res => {
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
    [`${TOPIC}.create`]:create_tracker
}



export default (broker) => {
   
    broker.subscribeAll(spec(fns,broker))
  
}