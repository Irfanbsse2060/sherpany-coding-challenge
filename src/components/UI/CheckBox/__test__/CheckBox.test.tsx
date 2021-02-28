import React from 'react';
import {render} from '@testing-library/react';
import CheckBox from '../index'


describe('Check Box', () => {

    const options = [
        {isChecked: true, label: 'Canada (CH)', name: 'CH', value: 'CH'},
        {isChecked: false, label: 'Spain (ES)', name: 'ES', value: 'ES'},
        {isChecked: false, label: 'France (FR)', name: 'FR', value: 'FR'}
    ]

    test('should be able to render', () => {
        const {container} = render(<CheckBox options={options} handleChange={jest.fn()}/>);
        expect(container).toMatchSnapshot()
    })

    test('should call handle change method', () => {
        const mockHandleChange = jest.fn()
        const {getByText} = render(<CheckBox options={options} handleChange={mockHandleChange}/>);
        getByText('Spain (ES)').click()
        expect(mockHandleChange).toHaveBeenCalledTimes(1)
        expect(mockHandleChange).toHaveBeenCalledWith("ES", true)
    });

})
