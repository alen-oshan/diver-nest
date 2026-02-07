import { auth } from '@/app/auth'
import { clearTempReserves } from '@/queries/reserve'
import { NextResponse } from 'next/server'

export async function DELETE(request) {
    try {
        const session = await auth()
        
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await clearTempReserves(session.user.email)
        
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('Error clearing temp reserves:', error)
        return NextResponse.json({ error: 'Failed to clear temp reserves' }, { status: 500 })
    }
}

// POST method for navigator.sendBeacon (used on page unload)
export async function POST(request) {
    try {
        const session = await auth()
        
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await clearTempReserves(session.user.email)
        
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('Error clearing temp reserves:', error)
        return NextResponse.json({ error: 'Failed to clear temp reserves' }, { status: 500 })
    }
}
