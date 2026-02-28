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
        const { title, slug, description, imageUrl, tags, content, isPublished } = body;

        const updatedBlog = await prisma.blog.update({
            where: { id: parseInt(id) },
            data: { title, slug, description, imageUrl, tags, content, isPublished },
        });

        return NextResponse.json(updatedBlog, { status: 200 });
    } catch (error) {
        console.error("Error updating blog:", error);
        if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
            return NextResponse.json({ error: "A blog with this slug already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const guard = await requireAdmin();
    if (!guard.ok) return guard.res;

    try {
        const { id } = await params;

        await prisma.blog.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
