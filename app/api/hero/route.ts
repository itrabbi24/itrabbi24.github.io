import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import HeroContent from '@/lib/models/HeroContent';

export async function GET() {
  await connectDB();
  const hero = await HeroContent.findOne();
  return NextResponse.json(hero || {});
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const data = await req.json();
  const hero = await HeroContent.findOneAndUpdate({}, data, { new: true, upsert: true });
  return NextResponse.json(hero);
}
