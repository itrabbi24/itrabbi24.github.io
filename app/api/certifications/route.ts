import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Certification from '@/lib/models/Certification';

export async function GET() {
  const db = await connectDB();
  if (!db) return NextResponse.json([]);
  const certs = await Certification.find().sort({ order: 1, createdAt: -1 });
  return NextResponse.json(certs);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const data = await req.json();
  const cert = await Certification.create(data);
  return NextResponse.json(cert, { status: 201 });
}
