import React from 'react'
import Link from 'next/link'

const BusinessName = () => {
    return (
        <>
            <Link className="lg:text-3xl text-2xl font-bold text-white pl-3 " href='/'>{process.env.COMPANY_NAME}</Link> 
        </>
    )
}

export default BusinessName