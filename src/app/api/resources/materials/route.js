import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

async function requireAdmin() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return { ok: false, res: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
    }
    if (session.user.role !== "ADMIN") {
        return { ok: false, res: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
    }

    return { ok: true, session };
}

// Get all Study Materials (Public)
export async function GET() {
    try {
        const materials = await prisma.studyMaterial.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(materials, { status: 200 });
    } catch (error) {
        console.error("Error fetching study materials:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Create a new Study Material (Admin)
export async function POST(req) {
    const guard = await requireAdmin();
    if (!guard.ok) return guard.res;

    try {
        const body = await req.json();
        const { title, description, iconName, themeName, fileUrl, isPublished } = body;

        if (!title || !description || !iconName || !themeName || !fileUrl) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newMaterial = await prisma.studyMaterial.create({
            data: {
                title,
                description,
                iconName,
                themeName,
                fileUrl,
                isPublished: isPublished ?? true,
            },
        });

        return NextResponse.json(newMaterial, { status: 201 });
    } catch (error) {
        console.error("Error creating study material:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
