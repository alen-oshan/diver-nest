import { NextResponse } from "next/server";
import {findResortByName} from '@/queries/resort'

export const GET = async (request, { params } ) => {

  const { slug } = await params;
  console.log("Resort slug:", slug);

  try {
    const resort = await findResortByName(slug);
    return NextResponse.json(resort, {
    status:200
  });
  } 
  catch (e){
    return new NextResponse.json(e.message, {
        status:500,
    })
  }

  return NextResponse.json({
    slug,
    message: "Slug received successfully",
  });
};
