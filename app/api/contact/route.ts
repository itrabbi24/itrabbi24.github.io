import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import ContactMessage from '@/lib/models/ContactMessage';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const message = await ContactMessage.create({ ...data, ip });
  return NextResponse.json({ success: true, id: message._id }, { status: 201 });
}
