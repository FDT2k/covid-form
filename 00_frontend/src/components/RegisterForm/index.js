import React, { useState, useEffect } from 'react';
import { useForm } from '@geekagency/use-fields-value'
import { isEmail, isEmptyString } from '@geekagency/composite-js/Validators'

import InputField from 'components/InputField'
import openpgp,{key,message} from 'openpgp'

import { useDispatch } from 'react-redux';
import { retrieveTracker,registerToTracker } from 'RemoteTasks';

import ReactLoading from 'react-loading';
const initialFormValues = { first_name: '', last_name: '', email: '', address: '', npa: '', city: '' }


export default props => {
    const { tracker_id } = props;
    const [loading, setLoading] = useState(true);
    const [pubKey, setPubKey] = useState();



    const _handleValidation = (field, value, values) => {

        if (isEmptyString(value)) {
            return `Ce champs doit être rempli`
        }

        return true
    }

    const _handleSubmit = async (v)=>{
        const { data: encrypted } = await openpgp.encrypt({
            message: message.fromText(JSON.stringify(v)),                 // input as Message object
            publicKeys: (await key.readArmored(pubKey)).keys, // for encryption
 
        });
        registerToTracker(tracker_id,encrypted)();
    }


    useEffect(() => {
        retrieveTracker(tracker_id)().then(result => {
            setPubKey(result.data.payload.pub_key)
            setLoading(false);
        });
    }, [])

    const { fields, inputProps, assignValues, formProps, validator, handleInput, formValid, formTouched, handleSubmit, handleEvents } = useForm(initialFormValues, _handleSubmit, _handleValidation, 'name', true)

    return (
        <>
            {loading && <ReactLoading type="balls" height={10} width={32} />}
            {!loading && <form {...formProps} method="post">
                <InputField
                    type="text"
                    {...inputProps('first_name')}
                    validator={validator.first_name}
                    placeholder="enter your name" />
                <InputField
                    type="text"
                    {...inputProps('last_name')}
                    validator={validator.last_name}
                    placeholder="enter your lastname" />
                <InputField
                    type="text"
                    {...inputProps('email')}
                    validator={validator.email}
                    placeholder="enter email" />
                <InputField
                    type="text"
                    {...inputProps('address')}
                    validator={validator.address}
                    placeholder="enter your mail address" />
                <InputField
                    type="text"
                    {...inputProps('npa')}
                    validator={validator.npa}
                    placeholder="enter your zip code" />
                <InputField
                    type="text"
                    {...inputProps('city')}
                    validator={validator.city}
                    placeholder="enter your city" />

                <button>Register</button>
            </form>
            }
        </>
    )
}