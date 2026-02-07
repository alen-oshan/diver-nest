import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

// For server components (pages)
export async function requireAdmin() {
    const session = await auth();
    
    if (!session?.user) {
        redirect('/login');
    }
    
    if (session.user.role !== 'admin') {
        redirect('/');
    }
    
    return session;
}

// For API routes
export async function requireAdminApi() {
    const session = await auth();
    
    if (!session?.user) {
        return { error: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }), session: null };
    }
    
    if (session.user.role !== 'admin') {
        return { error: NextResponse.json({ message: 'Forbidden: Admin access required' }, { status: 403 }), session: null };
    }
    
    return { error: null, session };
}
