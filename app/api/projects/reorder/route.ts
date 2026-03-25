import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Project from '@/lib/models/Project';

// PATCH /api/projects/reorder  body: { ids: string[] }
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { ids } = await req.json();
  if (!Array.isArray(ids)) return NextResponse.json({ error: 'ids required' }, { status: 400 });

  await connectDB();
  await Promise.all(ids.map((id: string, idx: number) =>
    Project.findByIdAndUpdate(id, { order: idx + 1 })
  ));

  return NextResponse.json({ success: true });
}
