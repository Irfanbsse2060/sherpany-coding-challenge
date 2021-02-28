import React, {ChangeEvent, FormEvent, MouseEvent} from "react";

import './UserSearch.scss'
import {Button, ButtonType, TextField} from '../../UI'
import {UserSearchInterface} from "../types";

interface formProps {
    onSubmit: (userSearch:UserSearchInterface) => void
    onClearFilter: () => void
}

export default function UserSearch({onSubmit, onClearFilter}: formProps) {
    const initialState = {name: ''}
    const [state, setState] = React.useState(initialState)
    const formRef = React.useRef<HTMLFormElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setState({
        ...state,
        [event.target.name]: event.target.value
    })

    const {name} = state

    const handleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (formRef && formRef.current) {
            if (formRef.current.checkValidity()) {
                onSubmit(state)
            } else
                formRef.current.reportValidity();
        }
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className='user-search'>
            <TextField label='Name' name='name' value={name} required={true} handleChange={handleChange}/>
            <div className='user-search__action'>
                <Button type={ButtonType.primary} handleClick={handleSubmit} text={'Search'}/>
                <Button type={ButtonType.secondary} handleClick={()=>{
                    setState(initialState)
                    onClearFilter()
                }} text={'Clear search'}/>
            </div>
        </form>
    )


}
