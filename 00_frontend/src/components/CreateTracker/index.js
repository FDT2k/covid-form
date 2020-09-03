import React,{useState} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { cEx } from '@geekagency/gen-classes'

import { create_kit } from 'Redux/TrackerKit/actions'

import uuid from 'uuid/v4';

import CreateTrackerForm from 'components/CreateTrackerForm';

import ReactLoading from 'react-loading';

import Progress from 'components/Progress'
import * as FileSaver from 'file-saver';
import { pdf,PDFDownloadLink, Document, Page } from '@react-pdf/renderer'

import MyDoc from 'components/ClientPDF'

import QRCode from 'qrcode.react'

export default props => {
    
    const dispatch = useDispatch()

    const [isLoading,setLoading] = useState(false);
    const [qrString, setQR] = useState()
    const currentKey = useSelector(state=> state.pgp.key)
   

    const _handleSubmit = e => {
        console.log('submit')
        const tracker_id = uuid();
        console.log(tracker_id)

        const identities = [{name:e.identity,email:e.email}];
        const passphrase = e.passphrase;
        dispatch(create_kit(identities,passphrase));
       /* dispatch(generate_key_pair([{name:e.identity,email:e.email}],e.passphrase)).then(
            res=> {

            }
        )*/
    }

    const exportKey = _=> {
        const data = new Blob([currentKey.privateKeyArmored,currentKey.publicKeyArmored,currentKey.revocationCertificate], {type: 'text'});
        FileSaver.saveAs(data, 'private.txt');
      }
    const generating =  useSelector(state=> state.pgp.status !=='idle')
    const generated =  useSelector(state=> state.pgp.status ==='idle' && state.pgp.key !==null)
   
    const generatePDF = _=> {
        const qrCodeCanvas = document.querySelectorAll(
            "canvas"
          )[0];
          setQR(qrCodeCanvas.toDataURL("image/png"));


    }
    
    console.log('blobi',pdf(<MyDoc qr={qrString}/>).toBlob())

    return (
        <div>
            <QRCode value="prout" renderAs="canvas"/>
           {!generated && !generating && <CreateTrackerForm handleSubmit={_handleSubmit}/>}
           {generating && <ReactLoading type="cylon" color="white" height={50} width={100} />}
           {generated && !generating &&<button onClick={exportKey}>Download your covid kit</button>}
           <Progress/>
           <button onClick={generatePDF}>gogo</button>
           <PDFDownloadLink document={<MyDoc qr={qrString}/>} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
        </div>
    )
}