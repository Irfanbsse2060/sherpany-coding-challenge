// for filtering user using first and last name
export const filterUserByFirstNameAndLastName = (name: string, users: any[]) => {
    const splitName = name.split(' ')
    if (splitName.length > 1) {
        return users.filter((user) => {
            return `${user.name.first} ${user.name.last}`.match(new RegExp(`^${name}`, 'i'))
        })
    } else
        return users.filter(user => user.name.first.match(new RegExp(`^${name}`, 'i')) || user.name.last.match(new RegExp(`^${name}`, 'i')))

}
