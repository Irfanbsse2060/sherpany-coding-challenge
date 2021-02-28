import React from 'react';
import { render } from '@testing-library/react';
import userfixture from '../../../../utils/fixtures/userfixture'
import Table from '../index'

describe('Comment List', ()=>{

    test('should be able to render table', () => {
        const headers = [
            {
                name: "thumbnail",
                label: "Profile Image",
                customComponent: (value: string)=> (<div data-testid='custom-component'>custom component {value}</div>)
            },
            {
                name: "firstName",
                label: "First Name"
            },
            {
                name: "lastName",
                label: "Last Name"
            },
            {
                name: "email",
                label: "Email"
            }
        ]
        const { container, getAllByTestId } = render(<Table  header={headers} data={userfixture}/>);
        expect(getAllByTestId('custom-table-data-rows')).toHaveLength(4)
        expect(container).toMatchSnapshot()
    })


})
