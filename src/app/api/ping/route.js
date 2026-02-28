import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This endpoint is meant to be hit by a service like cron-job.org
// every 3-4 minutes to prevent the Neon free tier database from sleeping.
export async function GET() {
    try {
        // Perform a very lightweight query just to wake up the DB connection
        await prisma.$queryRaw`SELECT 1`;
        return NextResponse.json({ status: 'Database is awake' }, { status: 200 });
    } catch (error) {
        console.error("Ping error:", error);
        return NextResponse.json({ error: 'Database may be sleeping or unreachable' }, { status: 500 });
    }
}
