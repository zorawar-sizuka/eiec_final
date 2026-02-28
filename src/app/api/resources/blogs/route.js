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

// Get all Blogs (Public)
export async function GET() {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Create a new Blog (Admin)
export async function POST(req) {
    const guard = await requireAdmin();
    if (!guard.ok) return guard.res;

    try {
        const body = await req.json();
        const { title, slug, description, imageUrl, tags, content, isPublished } = body;

        if (!title || !slug || !description || !imageUrl || !content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newBlog = await prisma.blog.create({
            data: {
                title,
                slug,
                description,
                imageUrl,
                tags: tags || [],
                content,
                isPublished: isPublished ?? true,
            },
        });

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        console.error("Error creating blog:", error);

        // Handle unique slug error specifically for better UX
        if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
            return NextResponse.json({ error: "A blog with this slug already exists" }, { status: 400 });
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
