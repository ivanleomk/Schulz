import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.error();
  }

  const body = new FormData();
  body.append("file", file);

  body.append("model", "whisper-1");

  const data = await fetch(`https://api.openai.com/v1/audio/transcriptions`, {
    method: "POST",
    body: body,
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  });

  const res = await data.json();
  console.log(`${file.name}, ${file.type}`, res);

  return NextResponse.json({
    transcript: res["text"],
  });
}
