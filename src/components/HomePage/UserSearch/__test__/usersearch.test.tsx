import {render, fireEvent} from '@testing-library/react';
import UserSearch from '../index'
import React from "react";

describe('UserSearch', () => {

    test('should be able to render', () => {
        const {container} = render(<UserSearch onClearFilter={jest.fn} onSubmit={jest.fn()}/>)
        expect(container).toMatchSnapshot()
    })

    test('should not call onSubmit if form is not valid', () => {
        const mockSubmitMethod = jest.fn()
        const {getByTestId} = render(<UserSearch onSubmit={mockSubmitMethod} onClearFilter={jest.fn}/>)
        fireEvent.click(getByTestId('submit-bt'))
        expect(mockSubmitMethod).not.toHaveBeenCalled()
    });


    test('should clear the text when user click on clear button', () => {

        const {getByTestId} = render(<UserSearch onSubmit={jest.fn()} onClearFilter={jest.fn}/>)
        fireEvent.change(getByTestId('text_field_name'), {target: {value: 'test'}})
        expect(getByTestId('text_field_name').value).toEqual('test')

        fireEvent.click(getByTestId('clear-bt'))

        expect(getByTestId('text_field_name').value).toEqual('')
    });

    test('Should called onSubmit method with right form state', () => {

        const name = 'test'
        const mockSubmitMethod = jest.fn()
        const {getByTestId} = render(<UserSearch onSubmit={mockSubmitMethod} onClearFilter={jest.fn}/>)
        fireEvent.change(getByTestId('text_field_name'), {target: {value: name}})

        fireEvent.click(getByTestId('submit-bt'))

        expect(mockSubmitMethod).toHaveBeenCalledTimes(1)
        expect(mockSubmitMethod).toHaveBeenCalledWith({name})

    });


})
