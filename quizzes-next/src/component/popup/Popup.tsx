"use client";

import { FC, useState, useEffect } from "react";
import styles from "./Popup.module.css";
import { ServiceMinio } from "@/service/ServiceMinio";

interface PopupProps {
    closePopup: () => void;
    dataCard: {
        id: string;
        link: string; // это должен быть ключ файла в MinIO, например: videos/123.mp4
    };
}




if (typeof window !== "undefined") {
    let localIndex = localStorage.getItem("LocalIndex");
    if (localIndex === null) {
        localStorage.setItem("idCard", "0");
        console.log("test")
    }
}


export const Popup: FC<PopupProps> = ({ closePopup, dataCard }) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        closePopup();
    };

    // Загрузка ссылки при монтировании компонента
    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const url = await ServiceMinio.VideoPreviewLink(dataCard.link);
                setVideoUrl(url || "");
            } catch (err) {
                console.error("Ошибка получения ссылки на видео:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideoUrl();
    }, [dataCard.link]);

    return (
        <div className={styles.popupWrap}>
            <div className={styles.popupCard}>
                <video controls autoPlay>
                    {!isLoading && videoUrl ? (
                        <source src={videoUrl} type="video/mp4" />
                    ) : (
                        <p>Загрузка видео...</p>
                    )}
                    Ваш браузер не поддерживает видео.
                </video>

                <button className={styles.blackText} onClick={handleClose}>
                    закрыть
                </button>
            </div>
        </div>
    );
};