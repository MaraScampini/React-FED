import React from 'react'
import { errorCheck } from '../../services/useful';

export const TextInput = ({type, name, placeholder, design, state, errorState, password1}) => {

    const inputHandler = ({ target }, state) => {
        const { name, value } = target;
        state((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const errorHandler = ({target}, errorState, password1) =>{
        const {name, value} = target;
        let message = errorCheck(name, value, password1)
    
        errorState((prevState) => ({
          ...prevState,
          [name] : message
        }))
      }

  return (
    <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={design}
        onChange={(e)=>inputHandler(e, state)}
        onBlur={(e)=>errorHandler(e, errorState, password1)}

    />
  )
}

