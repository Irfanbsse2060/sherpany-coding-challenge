import React from "react";
import {render} from '@testing-library/react';
import SettingsPage from '../index'
import {CountryProvider} from "../../Context/CountryContext";


describe('SettingPage', () => {
    const renderComponent = () => {
        return (
            <CountryProvider>
                <SettingsPage/>
            </CountryProvider>
        )
    }

    test('should be able to render the component', () => {
        const {container} = render(renderComponent());
        expect(container).toMatchSnapshot()
    });

    test('should be able to select country', () => {
        const {queryByText} = render(renderComponent());
        const selector = '[type="checkbox"][value="CH"]'

        // @ts-ignore
        expect(document.querySelector(selector).checked).not.toBeTruthy()
        // @ts-ignore
        document.querySelector(selector).click()
        // @ts-ignore
        expect(document.querySelector(selector).checked).toBeTruthy()
    });


})
