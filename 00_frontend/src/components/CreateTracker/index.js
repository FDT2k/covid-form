import React,{useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import * as FileSaver from 'file-saver';
import uuid from 'uuid/v4';
import { pdf,PDFViewer,PDFDownloadLink, Document, Page } from '@react-pdf/renderer'
import JSZip from 'jszip'



import QRCode from '@geekagency/qrcode.react'
import { cEx } from '@geekagency/gen-classes'
import { create_kit } from 'Redux/TrackerKit/actions'
import CreateTrackerForm from 'components/CreateTrackerForm';
import {sel_pgp_key_generating,sel_pgp_key,sel_pgp_key_generated} from 'Redux/selectors'

import Progress from 'components/Progress'
import MyDoc from 'components/ClientPDF'



export default props => {
    
    const dispatch = useDispatch()

    const [isLoading,setLoading] = useState(false);
    const [qrString, setQR] = useState()
    const currentKey = useSelector(sel_pgp_key)
   

    const _handleSubmit = e => {
        console.log('submit')
        const tracker_id = uuid();
        console.log(tracker_id)

        const identities = [{name:e.identity,email:e.email}];
        const passphrase = e.passphrase;
        dispatch(create_kit(identities,passphrase,e.event_date));
       /* dispatch(generate_key_pair([{name:e.identity,email:e.email}],e.passphrase)).then(
            res=> {

            }
        )*/
    }

    const exportKey = _=> {
        const zip = new JSZip();


        const priv_key = new Blob([currentKey.privateKeyArmored], {type: 'text'});
        const pub_key = new Blob([currentKey.publicKeyArmored], {type: 'text'});
        const rev_key = new Blob([currentKey.revocationCertificate], {type: 'text'});

        zip.file('private_key.txt',priv_key)
        zip.file('public_key.txt',pub_key)
        zip.file('revocation_key.txt',rev_key)
        zip.file('qrcode.pdf',pdf(<MyDoc qr={qrString}/>).toBlob())
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            FileSaver.saveAs(content, "example.zip");
        });
      }


    const generating =  useSelector(sel_pgp_key_generating)
    const generated =  useSelector(sel_pgp_key_generated)
   
    const injectQRCode = _=> {
        const qrCodeCanvas = document.querySelectorAll(
            "canvas"
          )[0];
          if (qrCodeCanvas){
             setQR(qrCodeCanvas.toDataURL("image/png"));
            }


    }

    const uid = useSelector(state => state.ecov.tracker.tracker_id);
   

    return (
        <div>
            <QRCode handleChange={injectQRCode} value={`${process.env.REACT_APP_ECOV_API}/${uid}`} renderAs="canvas"/>
           {!generated && !generating && <CreateTrackerForm handleSubmit={_handleSubmit}/>}
           {generating && <ReactLoading type="cylon" color="white" height={50} width={100} />}
           {generated && !generating &&<button onClick={exportKey}>Download your covid kit</button>}
           <Progress/>
          
        </div>
    )
}