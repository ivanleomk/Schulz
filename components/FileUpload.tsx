"use client";
import React from "react";

const FileUpload = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [transcript, setTranscript] = React.useState<string>("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    let formData = new FormData();
    formData.append("file", file);
    formData.append("model", "whisper-1");
    formData.append("response_format", "verbose_json");

    console.log(formData);
    console.log(formData.get("model"));
    console.log(formData.get("response_format"));
    console.log(formData.get("file"));

    fetch("/api/openai/get-transcript", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then(async (res) => {
        console.log(res);
        const body = await res.json();
        setTranscript(body["transcript"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="file"
          accept=".mp3,.mp4"
          onChange={(e) => {
            const files = e?.target?.files;
            if (files && files.length > 0) {
              setFile(e?.target?.files?.[0]);
            }
          }}
        />
        <button type="submit">Submit</button>
      </form>
      {transcript.length == 0 ? <></> : <p>{transcript}</p>}
    </>
  );
};

export default FileUpload;
