import React from 'react';
import { useForm } from '@geekagency/use-fields-value'
import { isEmail, isEmptyString } from '@geekagency/composite-js/Validators'

import InputField from 'components/InputField'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const initialFormValues = { identity: 'fdt', email: 'fabien@ditore.ch',event_date:new Date(), passphrase: 'test', confirm: 'test' }


export default props => {

    const { handleSubmit: _handleSubmit } = props

    const _handleValidation = (field, value, values) => {
        if (field === 'email') {
            if (isEmptyString(value))
                return `Il manque votre adresse e-mail`
            if (!isEmail(value))
                return `Essayez quelque chose comme "votre@adresse.com"`;
        }

        if (isEmptyString(value)) {
            return `Ce champs doit être rempli`
        }

        return true
    }



    const { fields, inputProps,assignValues, formProps, validator, handleInput, formValid, formTouched, handleSubmit, handleEvents } = useForm(initialFormValues, _handleSubmit, _handleValidation, 'name', true)

    console.log(fields)
    return (

        <form {...formProps} method="post">
            <InputField
                type="text"
                {...inputProps('identity')}
                validator={validator.identity}
                placeholder="enter a name" />
            <InputField
                type="text"
                {...inputProps('email')}
                validator={validator.email}
                placeholder="enter your email address" />
            <InputField
                type="password"
                {...inputProps('passphrase')}
                validator={validator.passphrase}
                placeholder="enter a strong password" />
            <InputField
                type="password"
                {...inputProps('confirm')}
                validator={validator.confirm}
                placeholder="enter your password confirmation" />
            <DatePicker
                selected={fields.event_date}
                name="event_date"
                dateFormat="dd.MM.yyyy"
                onChange={date => {
                    console.log(date);
                    assignValues({event_date:date})
                    }}
            />
            <button>Create Tracker</button>
        </form>

    )
}