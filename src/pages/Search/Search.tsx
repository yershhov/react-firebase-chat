import { motion } from 'framer-motion'
import React, { ChangeEvent, createContext, useState } from 'react'
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
    const handleSearchChange = (e: ChangeEvent) => {
        setSearch((e.target as HTMLInputElement).value)
    }
    return (
        <motion.div className="h-[calc(100%-3.8rem)]">
            <SearchContext.Provider value={{ search, handleSearchChange }}>
                <SearchHeader />
                <div className="h-full overflow-y-auto">

                </div>
            </SearchContext.Provider>
        </motion.div>

    )
}

export default Search