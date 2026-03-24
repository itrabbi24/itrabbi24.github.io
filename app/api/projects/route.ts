import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';

export async function GET() {
  await connectDB();
  const projects = await Project.find({ status: 'active' }).sort({ order: 1, createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const data = await req.json();
  const project = await Project.create(data);
  return NextResponse.json(project, { status: 201 });
}
