import React from 'react'
import { cEx } from '@geekagency/gen-classes'


export default props => {

  const {className,type,id,placeholder,...rest} = props




  const _type = type || 'text'
  const _id = id || 'id'
    return (<div className="floating-label-wrap">
        <input
            className={cEx(["floating-label-field",className])}
            type={_type}
            id={_id}
            placeholder={placeholder}
            {...rest}
            />
          <label htmlFor={_id} className="floating-label">{placeholder}</label>
    </div>
    )
}
