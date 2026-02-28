import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

export async function POST(req) {
    const guard = await requireAdmin();
    if (!guard.ok) return guard.res;

    try {
        const formData = await req.formData();
        const file = formData.get("file");

        // Bucket name we agreed on
        const bucketName = "eiec-resources";

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // --- Ensure Bucket Exists ---
        const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets();

        if (bucketsError) {
            console.error("Error fetching buckets:", bucketsError);
            return NextResponse.json({ error: "Failed to verify storage buckets" }, { status: 500 });
        }

        const bucketExists = buckets.some(b => b.name === bucketName);

        if (!bucketExists) {
            console.log(`Bucket '${bucketName}' not found. Creating it now...`);
            const { error: createError } = await supabaseAdmin.storage.createBucket(bucketName, {
                public: true, // IMPORTANT: Allows public read access to uploaded files
                fileSizeLimit: 10485760, // 10MB limit roughly
            });

            if (createError) {
                console.error("Failed to create bucket:", createError);
                return NextResponse.json({ error: "Storage bucket not found and could not be created automatically. Please create 'eiec-resources' in Supabase dashboard." }, { status: 500 });
            }
        }
        // -----------------------------

        // Generate a unique file name to prevent overwrites
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Convert file to buffer for Supabase upload
        const buffer = Buffer.from(await file.arrayBuffer());

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabaseAdmin
            .storage
            .from(bucketName)
            .upload(filePath, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error("Supabase upload error:", uploadError);
            return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }

        // Get the public URL 
        // Format: https://[project].supabase.co/storage/v1/object/public/eiec-resources/filename.ext
        const { data: { publicUrl } } = supabaseAdmin
            .storage
            .from(bucketName)
            .getPublicUrl(filePath);

        return NextResponse.json({ url: publicUrl, success: true }, { status: 200 });

    } catch (error) {
        console.error("File upload failed:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
