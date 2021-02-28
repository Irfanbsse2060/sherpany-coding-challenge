import React, {ChangeEvent} from 'react'
import './TextField.scss'

interface TextFieldProps {
    label: string
    name: string
    type?: string
    value: string | number
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
    testId?: string
    required?: boolean
}

export default function TextField(props: TextFieldProps) {
    const {type = 'text', required = false, testId, label, name, value, handleChange} = props
    return (
        <div className='text-field'>
            <label className='text-field__label' >{label}</label>
            <input
                className='text-field__input'
                data-testid={testId || `text_field_${name}`}
                name={name}
                type={type}
                value={value}
                required={required}
                onChange={handleChange}/>
        </div>
    )

}
