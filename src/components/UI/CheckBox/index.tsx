import React, {ChangeEvent} from 'react'
import './CheckBox.scss'

interface CheckBoxOptions {
    label: string,
    name: string,
    value: string,
    isChecked: boolean
}


interface CheckBoxProps {
    options: CheckBoxOptions[]
    testId?: string
    handleChange: (name: string, isChecked: boolean) => void
}

export default function CheckBox(props: CheckBoxProps) {
    const {testId, options, handleChange} = props

    const handleClick = (e: any) => {
        handleChange(e.target.name, e.target.checked)
    }

    return (
        <ul className='check-box' data-testid={testId || `check-box`}>
            {
                options.map(({value, label, isChecked, name}) => {
                    return (
                        <li className='check-box__item' key={name}>
                            <input onChange={handleClick}
                                   type="checkbox"
                                   checked={isChecked}
                                   name={name}
                                   id={name}
                                   value={value}/>
                            <label htmlFor={name}>{label}</label>
                        </li>
                    )
                })
            }
        </ul>
    )

}
