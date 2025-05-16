import type { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Подключение к MinIO
console.log("test")

const s3Client = new S3Client({
    endpoint: process.env.MINIO_ENDPOINT,
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY!,
        secretAccessKey: process.env.MINIO_SECRET_KEY!,
    },
    forcePathStyle: true,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    console.log("test")

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.startsWith('multipart/form-data')) {
        return res.status(400).json({ error: 'Invalid content type' });
    }

    const chunks: Buffer[] = [];
    for await (const chunk of req) {
        chunks.push(chunk as Buffer);
    }

    const body = Buffer.concat(chunks);

    const params = {
        Bucket: process.env.MINIO_BUCKET_NAME!,
        Key: `videos/${Date.now()}.mp4`,
        Body: body,
        ContentType: contentType,
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        res.status(200).json({ message: 'Видео загружено' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при загрузке видео' });
    }
};

export default handler;