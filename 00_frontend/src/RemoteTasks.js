import {defaultTo,test} from '@geekagency/composite-js'
import {Task} from '@geekagency/composite-js/Monad'
import axios from 'axios'

// (FN-> Promise) -> Task
const PToTask = promise => Task (
   (rej,res)=>{
     promise().then(res).catch(rej)
   }
 )

export const createTracker = (tracker_id,pub_key,event_date) => _=>  axios.put(`${process.env.REACT_APP_ECOV_API}/admin/${tracker_id}`,{pub_key,event_date}) 
export const retrieveTracker = (tracker_id) => _=>  axios.get(`${process.env.REACT_APP_ECOV_API}/event/${tracker_id}`,{}) 
export const registerToTracker = (tracker_id,cyphertext) => _=>  axios.put(`${process.env.REACT_APP_ECOV_API}/event/${tracker_id}`,{cyphertext}) 
