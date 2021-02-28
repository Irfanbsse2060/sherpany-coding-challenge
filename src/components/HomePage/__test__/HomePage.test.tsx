import React from "react";
import {fireEvent, render, wait} from '@testing-library/react'
import HomePage from '../index'
import {CountryProvider} from "../../Context/CountryContext";

import users from "../../../utils/fixtures/userfixture";


describe('Homepage', () => {
    beforeEach(() => {
        fetch.resetMocks();
        fetch.mockResponseOnce(JSON.stringify({results: users}));
    });

    const renderComponent = () => {
        return (
            <CountryProvider>
                <HomePage/>
            </CountryProvider>
        )
    }

    test('should be able to render', async () => {
        const {container, getAllByTestId} = render(renderComponent())
        await wait(() => expect(getAllByTestId('custom-table-data-rows')).toHaveLength(users.length))
        expect(container).toMatchSnapshot()
    });

    test('should be able to search the users by name', async () => {
        const searchName = users[0].name.first
        const {getAllByTestId, getByTestId, getByText} = render(renderComponent())
        await wait(() => expect(getAllByTestId('custom-table-data-rows')).toHaveLength(users.length))

        fireEvent.change(getByTestId('text_field_name'), {target: {value: searchName}})
        fireEvent.click(getByTestId('submit-bt'))

        expect(getAllByTestId('custom-table-data-rows')).toHaveLength(1)
        getByText(searchName)
        getByText(users[0].email)
    });

})
