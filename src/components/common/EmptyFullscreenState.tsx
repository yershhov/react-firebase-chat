import React from 'react'

type EmptyFullscreenStateProps = {
    message: string
}

const EmptyFullscreenState = (props: EmptyFullscreenStateProps) => {
    return (
        <div className='h-[calc(100%-7.6rem)] flex items-center justify-center w-full absolute'>
            <div className='bg-raisinBlack bg-opacity-40 w-[75%] sm:w-[15rem] text-center py-20 px-3 rounded-3xl text-gray-500'>
                {props.message}
            </div>
        </div>
    )
}

export default EmptyFullscreenState