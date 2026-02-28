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

export async function PUT(req, { params }) {
    const guard = await requireAdmin();
    if (!guard.ok) return guard.res;

    try {
        const { id } = await params;
        const body = await req.json();
        const { title, description, iconName, themeName, fileUrl, isPublished } = body;

        const updatedMaterial = await prisma.studyMaterial.update({
            where: { id: parseInt(id) },
            data: { title, description, iconName, themeName, fileUrl, isPublished },
        });

        return NextResponse.json(updatedMaterial, { status: 200 });
    } catch (error) {
        console.error("Error updating study material:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const guard = await requireAdmin();
    if (!guard.ok) return guard.res;

    try {
        const { id } = await params;

        await prisma.studyMaterial.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting study material:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
