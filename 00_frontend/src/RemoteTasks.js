import {defaultTo,test} from '@geekagency/composite-js'
import {Task} from '@geekagency/composite-js/Monad'
import axios from 'axios'

// (FN-> Promise) -> Task
const PToTask = promise => Task (
   (rej,res)=>{
     promise().then(res).catch(rej)
   }
 )

export const createTracker = (tracker_id,pub_key) => _=>  axios.put(`${process.env.REACT_APP_ECOV_API}/admin/${tracker_id}`,{pub_key}) 
