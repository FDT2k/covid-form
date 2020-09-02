import React,{ useState,useEffect } from "react";

export default (initialState,prop='id') => {
  const [values, setValues] = useState(initialState);




  const handleChange = (event) => {
    if (typeof (event.target[prop]) === 'undefined'){
      console.error (`prop ${prop}  not present on target`)
    }
    const newState = {
      ...values,
      [event.target[prop]]: event.target.value
    }
    setValues(newState);
    return newState;
  }



  return {
    values,
    handleChange,
  };
}
