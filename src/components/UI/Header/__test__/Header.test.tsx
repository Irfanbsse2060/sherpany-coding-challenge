import React from 'react';
import {render} from '@testing-library/react';
import Header from '../index'
import {BrowserRouter as Router} from "react-router-dom";

describe('Text Field', () => {

    const linkList = [
        {
            label: "Home",
            url: "/"
        },
        {
            label: "Settings",
            url: "/settings"
        }
    ]
    test('should be able to render', () => {
        const {container} = render(<Router>
            <Header linkList={linkList}/>
        </Router>);
        expect(container).toMatchSnapshot()
    })


})
