import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextField from '../index'

describe('Text Field', ()=>{

    test('should be able to render', () => {
        const { container } = render(<TextField value='test' label='label' name='name' handleChange={jest.fn()}/>);
        expect(container).toMatchSnapshot()
    })

    test('should be able to render with required', () => {
        const { container } = render(<TextField value='test' label='label' name='name' required={true} handleChange={jest.fn()}/>);
        expect(container).toMatchSnapshot()
    });

    test('should call handle change method', () => {
        const mockHandleChange =  jest.fn()
        const { getByTestId } = render(<TextField value='test' label='label' name='name' required={true} handleChange={mockHandleChange}/>);
        fireEvent.change(getByTestId('text_field_name'), { target: { value: 'newValue' } })
        expect(mockHandleChange).toHaveBeenCalledTimes(1)
    });

})
