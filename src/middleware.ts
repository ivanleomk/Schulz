import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { DB } from "./types/database";
import { redirect } from "next/navigation";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient<DB>({ req, res });
  const session = await supabase.auth.getSession();

  if (!session.data.session) {
    const url = req.nextUrl.clone();
    const baseUrl = url.origin;
    return NextResponse.redirect(baseUrl);
  }
  return res;
}

export const config = {
  matcher: ["/dashboard"],
};
