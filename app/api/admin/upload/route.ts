import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { BUCKET_AGENT, BUCKET_PROPERTY } from "@/lib/storage";

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const bucket = form.get("bucket") as string;
  const path = form.get("path") as string;

  if (!(file instanceof File) || !bucket || !path) {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }

  if (bucket !== BUCKET_AGENT && bucket !== BUCKET_PROPERTY) {
    return NextResponse.json({ error: "Invalid bucket" }, { status: 400 });
  }

  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Use JPEG, PNG, or WebP" },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Max file size 2 MB" }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await admin.storage.from(bucket).upload(path, buffer, {
    upsert: true,
    contentType: file.type,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ path });
}
