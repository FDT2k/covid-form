import React from 'react';

import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import {STATUS} from 'Redux/TrackerKit/actions'
import './style.scss'
export default props => {

    const generating_keys =  useSelector(state=> state.pgp.status !=='idle')
    const generated_keys =  useSelector(state=> state.pgp.status ==='idle' && state.pgp.key !==null)
    const generated_uid = useSelector(state => state.ecov.tracker.tracker_id !==null);
    const remote_tracker= useSelector(state => state.ecov.ecov.tracker_created);
    return (
        <ul className="progress">
             <li>
                <div>Creating id</div>
                {!generated_uid && <ReactLoading type="balls" height={10} width={32} />}
                {generated_uid && "ok"}
            </li>
            <li>
                <div>Generating keys</div>
                {generating_keys && <ReactLoading type="balls" height={10} width={32} />}
                {generated_keys && "ok"}
            </li>
            <li>
                <div>Creating remote tracke</div>
                {remote_tracker===STATUS.WORKING && <ReactLoading type="balls" height={10} width={32} />}
                {remote_tracker===STATUS.COMPLETE && "ok"}
                {remote_tracker===STATUS.ERROR && "error"}
            </li>
            <li>
                <div>Rendering Pdfs</div>
                <ReactLoading type="balls" height={10} width={32} />
            </li>
          
        </ul>)
}