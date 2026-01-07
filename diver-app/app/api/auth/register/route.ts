// app/api/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/lib/models/User.model';
import connectDB from '@/lib/db/mongoose';

export async function POST(req: Request) {
  const { name, email, password, phone } = await req.json();
  
  await connectDB();
  const existingUser = await User.findOne({ email });
  if (existingUser) return NextResponse.json(
    { error: 'User exists' }, 
    { status: 400 }
  );
  
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name, email, phone, passwordHash: hashedPassword, role: 'customer'
  });
  
  return NextResponse.json({ success: true, userId: user._id });
}