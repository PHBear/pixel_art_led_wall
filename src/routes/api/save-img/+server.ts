import fs from "fs";
import path from "path";

interface SaveImagePayload {
  fileName: string;
  grid: string;
}

export async function POST(event) {
  const input = await event.request.json();
  if (!input) {
    return new Response(JSON.stringify({ success: false }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const payload = input as SaveImagePayload;

  const pathToStoreFile = '/home/philipp/dev/led-wall/json_pics/';
//   const pathToStoreFile = "./";
  const filePath = path.join(pathToStoreFile, payload.fileName + ".json");
  fs.writeFileSync(filePath, JSON.stringify(payload.grid));

  return new Response(JSON.stringify({ success: true }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
