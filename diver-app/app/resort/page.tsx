import React from 'react'
import Header from '@/app/components/layout/Header'

const page = () => {
    const resortList = ['Diver-nest', 'new hotel']

    return (
        <>
            <Header />
            {resortList.map((resort, index) => <li key={index}>{resort}</li>)}
        </>
    )
}

export default page;