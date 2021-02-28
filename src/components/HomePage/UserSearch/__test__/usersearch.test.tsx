import {render, fireEvent} from '@testing-library/react';
import UserSearch from '../index'
import React from "react";

describe('UserSearch', () => {

    test('should be able to render', () => {
        const {container} = render(<UserSearch onSubmit={jest.fn()}/>);
        expect(container).toMatchSnapshot()
    })

    test('should not call onSubmit if form is not valid', () => {
        const mockSubmitMethod = jest.fn()
        const {getByTestId} = render(<UserSearch onSubmit={mockSubmitMethod}/>);
        fireEvent.click(getByTestId('custom-button'))
        expect(mockSubmitMethod).not.toHaveBeenCalled()
    });


    // TODO: Also test rating component by changing its value (improvement)
    test('Should called onSubmit method with right form state', () => {
        const expectedOutput = {
            name: 'test',
            email: 'test@gmail.com',
            rating: 0,
            comment: 'test comment'
        }
        const mockSubmitMethod = jest.fn()
        const {getByTestId} = render(<UserSearch onSubmit={mockSubmitMethod}/>);

        fireEvent.change(getByTestId('text_field_name'), {target: {value: expectedOutput.name}})
        fireEvent.change(getByTestId('text_field_email'), {target: {value: expectedOutput.email}})
        fireEvent.change(getByTestId('text_area_comment'), {target: {value: expectedOutput.comment}})
        fireEvent.click(getByTestId('custom-button'))

        expect(mockSubmitMethod).toHaveBeenCalledTimes(1)
        expect(mockSubmitMethod).toHaveBeenCalledWith(expectedOutput)

    });


})
