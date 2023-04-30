import { v4 as uuidv4 } from "uuid";
// Chunks are 15 mb by default
export const createChunks = (
  file: File,
  chunkSize = 15 * 1024 * 1024 /* cSize should be byte 1024*1 = 1KB */
) => {
  let offset = 0;
  const originalFileExtension = getFileExtension(file);
  console.log(`Identified Extension as ${originalFileExtension}`);
  const chunks = [];
  while (offset < file.size) {
    const chunkEnd = Math.min(file.size, offset + chunkSize);
    const truncatedBlob = file.slice(offset, chunkEnd);
    const truncatedFile = new File(
      [truncatedBlob],
      `audio-${offset}-${chunkEnd}.${originalFileExtension}`,
      {
        type: file.type,
      }
    );
    chunks.push(truncatedFile);
    offset += chunkSize;
  }
  return chunks;
};

export const getFileExtension = (file: File) => {
  const fileName = file.name;
  const extensionIndex = fileName.lastIndexOf(".");
  if (extensionIndex >= 0) {
    const extension = fileName.substring(extensionIndex + 1);
    return extension;
  } else {
    return "";
  }
};

export const generateFileName = (file: File) => {
  const id = uuidv4();
  const extension = getFileExtension(file);
  return `${id}.${extension}`;
};

export const generatePromisesInBatch = async <T>(
  promises: Promise<T>[],
  batchSize: number
): Promise<T[]> => {
  const results = [];

  for (let i = 0; i < promises.length; i += batchSize) {
    const batchPromises = promises.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batchPromises.map((p) => p.catch((e) => e))
    );
    results.push(...batchResults);
  }

  return results;
};

export const generateTranscriptFromChunkPromise = async (file: File) => {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("model", "whisper-1");
  formData.append("response_format", "verbose_json");

  const res = await fetch("/api/open-api/get-transcript", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  });
  const response = await res.json();
  console.log(`${file.name} :  `, response);
  return response;
};
