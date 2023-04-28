import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.error();
  }

  // now we send to our fast api backend
  const body = new FormData();
  body.append("file", file);

  const res = await fetch(process.env.BACKEND_API_SERVICE, {
    method: "POST",
    body: body,
  });

  const data = await res.json();

  const transcript = data["Transcribed Message"];

  return NextResponse.json({
    message: transcript,
  });
}
