import React from 'react'
import Link from 'next/link'

const BusinessName = () => {
    return (
        <>
            <Link className="text-3xl font-bold text-white pl-3" href='/'>{process.env.COMPANY_NAME}</Link> 
        </>
    )
}

export default BusinessName