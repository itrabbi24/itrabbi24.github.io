import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import About from '@/lib/models/About';

export async function GET() {
  const db = await connectDB();
  if (!db) return NextResponse.json({});
  const about = await About.findOne();
  return NextResponse.json(about || {});
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const data = await req.json();
  const about = await About.findOneAndUpdate({}, data, { new: true, upsert: true });
  return NextResponse.json(about);
}
