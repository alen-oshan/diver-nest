import React from 'react'
import Link from 'next/link'

const BusinessName = () => {
    return (
        <>
            <Link className="text-2xl font-bold text-white" href='/'>{process.env.COMPANY_NAME}</Link> 
        </>
    )
}

export default BusinessName