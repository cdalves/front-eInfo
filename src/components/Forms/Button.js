import React from 'react'
import style from './Button.module.css'

const Button = ({children, disabled, ...props}) => {
  return (
    <>
      <button className={style.button} disabled={disabled}  {...props}>{children}</button>
    </>
  )
}

export default Button
