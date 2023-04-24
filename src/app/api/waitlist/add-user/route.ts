import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function POST(request: NextRequest) {
  const { email, name, goal } = await request.json();
  const payload = {
    email,
    name,
    goal,
  };
  try {
    const result = await db
      .insertInto("Waitlist")
      .values(payload)
      .onDuplicateKeyUpdate({ name, goal })
      .executeTakeFirstOrThrow();
  } catch (err) {
    return NextResponse.json({
      status: 404,
      message:
        "Error Encountered - please contact @ivanleomk on twitter for help if problem persists",
    });
  }

  return NextResponse.json({
    status: 200,
    message: "Succesfully added user to waitlist",
  });
}
