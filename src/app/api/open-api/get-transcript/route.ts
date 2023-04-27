import {
  createReadStream,
  createWriteStream,
  write,
  writeFile,
  writeFileSync,
} from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.error();
  }

  const writeStream = createWriteStream("./testing.mp4");

  const reader = file.stream().getReader();

  function readAndWrite() {
    return reader.read().then(({ done, value }) => {
      if (done) {
        writeStream.end();
        console.log("File saved successfully.");
        return;
      }

      writeStream.write(value);
      return readAndWrite();
    });
  }

  readAndWrite().catch((error) => {
    console.error("Error saving file:", error);
  });

  // const readStream = createReadStream(file.stream()); // Assuming the `path` property contains the file path

  // readStream.pipe(writeStream);

  // writeStream.on("finish", () => {
  //   console.log("File saved successfully.");
  // });

  // writeStream.on("error", (error) => {
  //   console.error("Error saving file:", error);
  // });
  // const body = new FormData();
  // body.append("file", file);

  // body.append("model", "whisper-1");

  // const data = await fetch(`https://api.openai.com/v1/audio/transcriptions`, {
  //   method: "POST",
  //   body: body,
  //   headers: {
  //     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //   },
  // });

  // const res = await data.json();
  // console.log(`${file.name}, ${file.type}`, res);

  return NextResponse.json({
    transcript: "",
  });
}
