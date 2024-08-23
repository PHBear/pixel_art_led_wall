import type { RequestHandler } from '@sveltejs/kit';

interface SaveImagePayload {
    fileName: string;
    grid: string;
}

export const post: RequestHandler<SaveImagePayload> = async (request) => {
    const payload: SaveImagePayload = request.body;

    // TODO: include this const pathToStoreFile = '/home/philipp/dev/led-wall/json_pics/';
    const pathToStoreFile ='./';
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(pathToStoreFile, payload.fileName + '.json');
    fs.writeFileSync(filePath, JSON.stringify(payload.grid));

    return {
        status: 200,
        body: {
            message: "Image successfully saved"
        }
    };
};
