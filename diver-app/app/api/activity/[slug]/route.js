import { NextResponse } from "next/server";
import {findActivityByName} from '@/queries/activity'

export const GET = async (request, { params } ) => {

  const { slug } = await params;
  
  try {
    const resort = await findActivityByName(slug);
    return NextResponse.json(resort, {
    status:200
  });
  } 
  catch (e){
    return new NextResponse.json(e.message, {
        status:500,
    })
  }

};
