import React from 'react'


export default props => {
    const {validator,label, ...rest} = props;
    console.log(props)
    return (
        <div>
            <label>{label}</label>
            <div>{validator && validator.touched && validator.error}</div>
            <input {...rest}/>
        </div>
    )
}