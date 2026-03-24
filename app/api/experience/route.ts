import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Experience from '@/lib/models/Experience';

export async function GET() {
  await connectDB();
  const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(experiences);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const data = await req.json();
  const exp = await Experience.create(data);
  return NextResponse.json(exp, { status: 201 });
}
