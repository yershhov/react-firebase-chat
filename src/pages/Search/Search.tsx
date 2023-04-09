import { uuidv4 } from '@firebase/util';
import { collection, doc, getDocs, Query, query, QueryDocumentSnapshot, where } from 'firebase/firestore';
import { motion } from 'framer-motion'
import React, { ChangeEvent, createContext, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
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
    const [searchData, setSearchData] = useState<QueryDocumentSnapshot<UserEntity>[]>([])

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
            const filtered = allUsers.filter(user => {
                const userEmail = user.data().email
                if (userEmail.includes(search)) {
                    return userEmail
                }
            })

            setSearchData(filtered)
        } else setSearchData([])
    }, [search])
    return (
        <motion.div className="h-[calc(100%-3.8rem)]">
            <SearchContext.Provider value={{ search, handleSearchChange }}>
                <SearchHeader />
                <div className="h-full overflow-y-auto">
                    {searchData.map(user => <Link to={`/${user.data().email}`}>
                        <div
                            key={uuidv4()}
                            className=" border-b dark:border-zinc-700 flex items-center gap-4 px-4 py-1 hover:cursor-pointer hover:backdrop-brightness-150"
                        >
                            <div className="h-[3rem] dark:bg-zinc-700 aspect-square rounded-full"></div>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold text-[12px]">{user.data().email}</p>
                            </div>
                        </div>
                    </Link>)}
                </div>
            </SearchContext.Provider>
        </motion.div >

    )
}

export default Search