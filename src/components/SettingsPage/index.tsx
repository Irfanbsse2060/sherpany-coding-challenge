import React from 'react';
import {CheckBox} from '../UI'
import {useCountryDispatch, useCountryState} from '../Context/CountryContext'

import './SettingsPage.scss'

function SettingsPage() {
    const dispatch = useCountryDispatch()
    const {countries} = useCountryState()
    const [selectedCountries, setSelectedCountries] = React.useState({
        'CH': countries.includes('CH'),
        'ES': countries.includes('ES'),
        'FR': countries.includes('FR'),
        'GB': countries.includes('GB'),
    })

    const countriesList = [
        {isChecked: selectedCountries['CH'], label: 'Canada (CH)', name: 'CH', value: 'CH'},
        {isChecked: selectedCountries['ES'], label: 'Spain (ES)', name: 'ES', value: 'ES'},
        {isChecked: selectedCountries['FR'], label: 'France (FR)', name: 'FR', value: 'FR'},
        {isChecked: selectedCountries['GB'], label: 'United kingdom (GB)', name: 'GB', value: 'GB'},
    ]

    const handleChange = (name: string, isChecked: boolean) => {
        const updatedSelectedCountriesState = {
            ...selectedCountries,
            [name]: isChecked
        }
        setSelectedCountries(updatedSelectedCountriesState)
        dispatch({
            type: 'update',
            // @ts-ignore
            payload: Object.keys(updatedSelectedCountriesState).filter(country => updatedSelectedCountriesState[country])
        })
    }

    return (
        <main className='settings-page'>
            <h3> Select Nationality to filter user</h3>
            <CheckBox options={countriesList} handleChange={handleChange}/>
        </main>
    );
}

export default SettingsPage;

