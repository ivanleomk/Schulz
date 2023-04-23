import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;
  const query = await db
    .insertInto("waitlist")
    .values({
      email,
    })
    .onConflict((row) => row.column("email").doNothing())
    .executeTakeFirst();

  return NextResponse.json({
    success: true,
    message: "Succesfully added to waitlist!",
  });
}
