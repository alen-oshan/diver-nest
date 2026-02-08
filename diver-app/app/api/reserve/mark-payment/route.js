import { auth } from '@/app/auth'
import { markReservesInPayment } from '@/queries/reserve'
import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const session = await auth()
        
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await markReservesInPayment(session.user.email)
        
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('Error marking reserves in payment:', error)
        return NextResponse.json({ error: 'Failed to mark reserves' }, { status: 500 })
    }
}
