import { db } from "@/lib/db";
export async function GET(request: Request) {
  const query = await db.query("SELECT * FROM waitlist");
  return new Response("Hello, Next.js!");
}
