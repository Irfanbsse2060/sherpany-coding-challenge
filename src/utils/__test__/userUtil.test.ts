import data from "../fixtures/fixture";
import {filterUserByFirstNameAndLastName} from '../userUtil'

describe('User util', () => {
    test('filterUserByFirstNameAndLastName method should filtered based on first name', () => {
        const firstName= 'Lachlan'
        const response = filterUserByFirstNameAndLastName(firstName, data)

        expect(response).toHaveLength(1)
        expect(response[0].name.first).toEqual(firstName)
    })

    test('filterUserByFirstNameAndLastName method should ignore the case', () => {
        const firstName= 'Lachlan'
        const response = filterUserByFirstNameAndLastName(firstName.toLowerCase(), data)

        expect(response).toHaveLength(1)
        expect(response[0].name.first).toEqual(firstName)
    })

    test('filterUserByFirstNameAndLastName method should filtered using first and last name', () => {
        const firstName= 'Lachlan'
        const lastName= 'Roberts'
        const searchTerm = `${firstName} ${lastName}`
        const response = filterUserByFirstNameAndLastName(searchTerm, data)

        expect(response).toHaveLength(1)
        expect(response[0].name.first).toEqual(firstName)
        expect(response[0].name.last).toEqual(lastName)
    })

})
