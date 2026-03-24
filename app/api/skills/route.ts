import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Skill from '@/lib/models/Skill';

export async function GET() {
  await connectDB();
  const skills = await Skill.find().sort({ category: 1, order: 1 });
  return NextResponse.json(skills);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const data = await req.json();
  const skill = await Skill.create(data);
  return NextResponse.json(skill, { status: 201 });
}
