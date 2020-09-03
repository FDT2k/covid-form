import React from 'react';

import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

import './style.scss'
export default props => {


    return (
        <ul className="progress">
             <li>
                <div>Creating id</div>
                <ReactLoading type="balls" height={10} width={32} />
            </li>
            <li>
                <div>Creating id</div>
                <ReactLoading type="balls" height={10} width={32} />
            </li>
            <li>
                <div>Creating id</div>
                <ReactLoading type="balls" height={10} width={32} />
            </li>
            <li>
                <div>Creating id</div>
                <ReactLoading type="balls" height={10} width={32} />
            </li>
            <li>Generating keys</li>
            <li>Creating remote tracker</li>
            <li>Rendering Pdfs</li>
        </ul>)
}