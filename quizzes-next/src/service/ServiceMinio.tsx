import {
    S3Client,
    GetObjectCommand,
    S3ServiceException,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const ServiceMinio = {
    async VideoPreviewLink(Key: string): Promise<string | undefined> {
        const s3Client = new S3Client({
            endpoint: "http://localhost:9000",
            region: "us-east-1",
            credentials: {
                accessKeyId: "minioadmin",
                secretAccessKey: "minioadmin",
            },
            forcePathStyle: true,
        });

        try {
            const command = new GetObjectCommand({
                Bucket: "video",
                Key,
            });

            const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 час

            console.log(url)
            return url;
        } catch (err) {
            if (err instanceof S3ServiceException && err.name === 'NoSuchKey') {
                console.error('Файл не найден в хранилище');
            } else {
                console.error('Ошибка при получении ссылки:', err);
            }

            return undefined;
        }
    },
};