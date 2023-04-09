import { collection, doc, getDocs, Query, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import { motion } from 'framer-motion'
import React, { ChangeEvent, createContext, useCallback, useEffect, useState } from 'react'
import { firestore } from '../../firebase/config';
import { userConverter, UserEntity } from '../../firebase/entities/user';
import SearchHeader from './SearchHeader'

interface SearchConxtxtModel {
    search: string;
    handleSearchChange: Function
}
const searchInitialState: SearchConxtxtModel = {
    search: '',
    handleSearchChange: () => { }
}

export const SearchContext = createContext<SearchConxtxtModel>(searchInitialState)

const Search = () => {
    const [search, setSearch] = useState('')
    const [allUsers, setAllUsers] = useState<QueryDocumentSnapshot<UserEntity>[]>([])
    const [searchData, setSearchData] = useState<string[]>([])

    const handleSearchChange = (e: ChangeEvent) => {
        setSearch((e.target as HTMLInputElement).value)
    }
    const usersRef = collection(
        firestore,
        "users",
    ).withConverter(userConverter);

    const getAllUsers = async () => {
        return await getDocs(usersRef);
    }

    useEffect(() => {
        getAllUsers().then(res => setAllUsers(res.docs))
    }, [])

    useEffect(() => {
        if (search !== '') {
            const filtered = allUsers.map(user => {
                const userEmail = user.data().email
                if (userEmail.includes(search)) {
                    return userEmail
                }
            })
            // @ts-ignore
            setSearchData(filtered)
        }
    }, [search])

    return (
        <motion.div className="h-[calc(100%-3.8rem)]">
            <SearchContext.Provider value={{ search, handleSearchChange }}>
                <SearchHeader />
                <div className="h-full overflow-y-auto">

                    {searchData.map(email => <div>{email}</div>
                    )}
                </div>
            </SearchContext.Provider>
        </motion.div>

    )
}

export default Search