import { NextResponse } from 'next/server';
import { getReservesByName } from '@/queries/reserve'
import { findResortByName } from '@/queries/resort'
import { findActivityByName } from '@/queries/activity'
import { formatReserves } from './lib';

export const GET = async(request) => {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name'); 
    const type = searchParams.get('type');

    const item = type === 'stay' ? await findResortByName(name) : await findActivityByName(name)
    const reserves = await getReservesByName(name);

    if (reserves.length === 0) 
        return NextResponse.json(null, {status:200})
    
    const formattedReserves = formatReserves(reserves);
    if (type === 'stay')
        return NextResponse.json(formattedReserves, {status:200})
    else
        return NextResponse.json(reserves, {status:200})


}