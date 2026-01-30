import React from 'react'

type InputSearchProps = {
    placeholder: string,
    value?: string,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const InputSearch = ({
    placeholder,
    value,
    className,
    onChange,
    onKeyDown,
    onFocus,
    onBlur
}: InputSearchProps) => {
  return (
    <input 
        type='search'
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-3 outline-none ${className}`}
        autoComplete="off" 
    />
  )
}

export default InputSearch