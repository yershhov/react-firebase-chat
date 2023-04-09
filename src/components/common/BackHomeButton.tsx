import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import HeaderButton from './HeaderButton'

const BackHomeButton = () => {
    return (
        <Link to={'/'}>
            <HeaderButton
                icon={<IoArrowBackSharp size={20} />}
            />
        </Link>
    )
}

export default BackHomeButton