import React from "react";
import {render} from '@testing-library/react';
import MainPage from '../index'

//mock chart as its randomly generate ids due to which snapshot is failing
jest.mock("../../UI/LineGraph", () => {
    return {
        __esModule: true,
        A: true,
        default: () => {
            return <div>line chart</div>;
        },
    };
});


// TODO: we can add one more testing for testing behaviour.
describe('MainPage', () => {
    test('should be able to render', () => {
        const {container} = render(<MainPage/>);
        expect(container).toMatchSnapshot()
    });

})
