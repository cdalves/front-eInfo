import React from 'react'
import style from './Input.module.css'

const Input = ({label, type, name, value, onChange, error, onBlur}) => {
  return (
    <div>
        <label className={style.label} htmlFor={name}>{label}</label>
        <input id={name}
            name={name} 
            className={style.input} 
            type={type} value={value} 
            onChange={onChange} 
            onBlur={onBlur}
         />
        {error &&<p className={style.error}>{error}</p>}
    </div>
  )
}

export default Input
