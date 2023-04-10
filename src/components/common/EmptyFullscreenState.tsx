import React from 'react'

type EmptyFullscreenStateProps = {
    message: string
}

const EmptyFullscreenState = (props: EmptyFullscreenStateProps) => {
    return (
        <div className='h-[calc(100%-7.6rem)] flex items-center justify-center w-full absolute'>
            <div className='bg-gray-500 bg-opacity-10 w-[75%] sm:w-[15rem] text-center py-20 rounded-3xl text-gray-500'>
                {props.message}
            </div>
        </div>
    )
}

export default EmptyFullscreenState