import { NextResponse } from 'next/server'
import { putCartToReserve } from '@/queries/reserve'

export const GET = () => {
    putCartToReserve('alennoob80@gmail.com')
    return new NextResponse('updated', {status:200})
}