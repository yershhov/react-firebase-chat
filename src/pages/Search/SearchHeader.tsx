import { motion } from 'framer-motion'
import { useContext, useEffect, useRef } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import HeaderButton from '../../components/common/HeaderButton'
import HeaderContainer from '../../components/layouts/HeaderContainer'
import { SearchContext } from './Search'

const SearchHeader = () => {
    const navigate = useNavigate();
    const { search, handleSearchChange } = useContext(SearchContext)
    const searchInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => { searchInputRef.current!.focus() }, [searchInputRef.current])

    return (
        <HeaderContainer>
            <motion.div className="flex items-center gap-4 h-full">
                <HeaderButton
                    icon={<IoArrowBackSharp size={19} />}
                    onClick={() => navigate('/')}
                />
                <form
                    action="post"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    className="w-full"
                >
                    <div className="w-full flex">
                        <input
                            ref={searchInputRef}
                            type="text"
                            id="message"
                            className="text-sm w-full h-[3.3rem] p-4 pl-1 dark:bg-transparent
                          dark:placeholder-zinc-600 dark:text-gray-200 focus:outline-none caret-primary caret-w-10"
                            placeholder="Search user by email"
                            autoComplete="off"
                            onChange={(e) => handleSearchChange(e)}
                            value={search}
                        />
                    </div>
                </form>
            </motion.div>
        </HeaderContainer>
    )
}

export default SearchHeader