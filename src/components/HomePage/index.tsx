import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './HomePage.scss'
import UserSearch from './UserSearch'
import {
    Table
} from '../UI';
import {useCountryState} from '../Context/CountryContext'

import {filterUserByFirstNameAndLastName} from '../../utils/userUtil'
import {UserSearchInterface} from "./types";

interface User {
    email: string,
    gender: string,
    nat: string,
    name: {
        first: string,
        last: string
    },
    location: {
        country: string
    },
    picture: {
        thumbnail:string
    }
}

function HomePage() {
    const [userList, updateUserList] = useState<User[]>([])
    const [hasMoreUsers, updateHasMoreUsers] = useState(true)
    const [page, updatePage] = useState(1)
    const [filteredUserList, updateFilteredUserList] = useState<User[]>([])
    const [isFilterApplied, updateIsFilterApplied] = useState(false)
    const {countries} = useCountryState()

    useEffect(() => {
        const fetchData = async (): Promise<any> => {
            const response = await fetch(`https://randomuser.me/api/?results=30&page=${page}&nat=${countries.join(',')}`)
            const data = await response.json()
            if (data.results.length === 0)
                updateHasMoreUsers(false)
            else
                updateUserList(userList.concat(data.results))
        }
        fetchData()
    }, [page]);

    const onSubmit = (userSearch: UserSearchInterface) => {
        const result = filterUserByFirstNameAndLastName(userSearch.name, userList)
        updateIsFilterApplied(true)
        updateFilteredUserList(result)
    }

    const headers = [
        {
            name: "thumbnail",
            label: "Profile Image",
            customComponent: (value: string)=> (<img className='thumbnail' src={value}/>)
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
        },
        {
            name: "gender",
            label: "Gender"
        },
        {
            name: "nat",
            label: "Nationality"
        },
        {
            name: "country",
            label: "Location"
        }
    ]
    const usersToShow = isFilterApplied ? filteredUserList : userList

    const renderTable = () => (
        <Table header={headers} data={usersToShow.map((user) => {
            return {
                thumbnail: user.picture.thumbnail,
                picture: user.email,
                gender: user.gender,
                nat: user.nat,
                firstName: user.name.first,
                lastName: user.name.last,
                country: user.location.country,
            }
        })}/>
    )

    const renderInfiniteScrollTable = () => (
        <InfiniteScroll
            dataLength={userList.length} //This is important field to render the next data
            next={() => {
                updatePage(page + 1)
            }}
            height={'60vh'}
            hasMore={hasMoreUsers}
            loader={<h4 className='text-align-center'>Loading...</h4>}
            endMessage={
                <p className='text-align-center'>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            {renderTable()}
        </InfiniteScroll>
    )

    return (
        <main className='main-page'>
            <section className='main-page__search'>
                <h3>Search Users</h3>
                <UserSearch onSubmit={onSubmit} onClearFilter={() => updateIsFilterApplied(false)}/>
            </section>
            <section className='main-page__users-list'>
                <h3>Users</h3>
                {isFilterApplied ? renderTable() : renderInfiniteScrollTable()}

            </section>
        </main>
    );
}

export default HomePage;

