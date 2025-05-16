"use client";
import { useState } from "react";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ServiceData } from "@/service/ServiceCard"

export default function Form() {
    const [loading, setLoading] = useState(false);
    // const [comment, setComment] = useState("");


    let idCard = localStorage.getItem("idCard")


    const uploadToMinIO = async (file, commentVideo) => {
        const s3Client = new S3Client({
            endpoint: "http://localhost:9000",
            region: "us-east-1",
            credentials: {
                accessKeyId: "minioadmin", // ❌ НЕ ДЕЛАЙТЕ ЭТО В ПРОДАКШЕНЕ
                secretAccessKey: "minioadmin", // ❌ Секретный ключ в клиенте — опасно
            },
            forcePathStyle: true,
        });

        const Key = `videos/${Date.now()}-${file.name}`;

        const arrayBuffer = await file.arrayBuffer();
        const params = {
            Bucket: "video",
            Key,
            Body: new Uint8Array(arrayBuffer),
            ContentType: file.type,
        }

        try {
            await s3Client.send(new PutObjectCommand(params));

            const command = new GetObjectCommand({
                Bucket: "video",
                Key,
            });

            const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 час

            alert("Видео успешно загружено!");
        } catch (err) {
            console.error("Ошибка:", err);
            alert("Ошибка при загрузке или получении ссылки");
        }

        let data = {
            "id": (`${Number(idCard) + 1}`),
            "link": Key,
            "comment": commentVideo,
            "status": ""
        }
        ServiceData.PostCreateCard(data)

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const file = e.target.video.files[0];
        if (!file) return;
        const commentVideo = e.target.commentVideo.value
        console.log(commentVideo)
        await uploadToMinIO(file, commentVideo);
        setLoading(false);
    };

    return (
        <div>
            <form className=" text-black " onSubmit={handleSubmit}>
                <input type="file" className="border-zinc-900 border-2" name="video" accept="video/*" />
                <input type="text" className="border-zinc-900 border-2" name="commentVideo" />
                <button className="" type="submit" disabled={loading}>
                    {loading ? "Загрузка..." : "Загрузить"}
                </button>
            </form>
        </div>
    );
}