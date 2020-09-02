import React,{useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { cEx } from '@geekagency/gen-classes'

import { generate_key_pair } from 'Redux/Keys/actions'

import uuid from 'uuid/v4';

import CreateTrackerForm from 'components/CreateTrackerForm';

import ReactLoading from 'react-loading';

import * as FileSaver from 'file-saver';

export default props => {
    
    const dispatch = useDispatch()

    const [isLoading,setLoading] = useState(false);


    const currentKey = useSelector(state=> state.pgp.key)
   

    const _handleSubmit = e => {
        console.log('submit')
        const tracker_id = uuid();
        console.log(tracker_id)
        dispatch(generate_key_pair([{name:e.identity,email:e.email}],e.passphrase)).then(
            res=> {

            }
        )
    }

    const exportKey = _=> {
        const data = new Blob([currentKey.privateKeyArmored,currentKey.publicKeyArmored,currentKey.revocationCertificate], {type: 'text'});
        FileSaver.saveAs(data, 'private.txt');
      }
    const generating =  useSelector(state=> state.pgp.status !=='idle')
    const generated =  useSelector(state=> state.pgp.status ==='idle' && state.pgp.key !==null)

    return (
        <div>
           {!generated && !generating && <CreateTrackerForm handleSubmit={_handleSubmit}/>}
           {generating && <ReactLoading type="cylon" color="white" height={50} width={100} />}
           {generated && !generating &&<button onClick={exportKey}>Download your covid kit</button>}
        </div>
    )
}