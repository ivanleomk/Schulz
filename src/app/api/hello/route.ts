import { db } from "@/lib/db";
export async function GET(request: Request) {
  const query = await db.selectFrom("Note").selectAll().execute();
  console.log(query);
  return new Response("Hello, Next.js!");
}

export const config = {
  runtime: "edge",
};
