import React from 'react'

export const Input = ({ type="text", className, onChange, inputRef, name,value, acceptFormat ,onKeyDown ,placeholder }) => {
  return (
    <input type={type} onKeyDown={onKeyDown} className={className} onChange={onChange} placeholder={placeholder} ref={inputRef} name={name} value={value} accept={ acceptFormat} />
  )
}
