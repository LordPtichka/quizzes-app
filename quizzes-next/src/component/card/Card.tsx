"use client"

import { FC, useState } from "react"
import styles from "./Card.module.css"
import { Popup } from "../popup/Popup"
import { ServiceData } from "@/service/ServiceCard"

const Card: FC = ({ dataCard }) => {
    const [index, setIndex] = useState(dataCard.id);

    const [isActive, setIsActive] = useState(false); // card status
    const [isPopupOpen, setIsPopupOpen] = useState(false); // popup status

    const clickCard = (id) => {
        dataCard.status == "completed" ? ServiceData.PatchStatusDisable(id) : ServiceData.PatchStatusActive(id)

        openPopup()
    };
    // =========================
    const openPopup = () => {
        setIsActive(true); // Активируем покраску при нажатии
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    if (typeof window !== "undefined") {
        localStorage.setItem("idCard", index);
    }




    return (
        <div
            className={`${styles.cardBlock}`}
            onClick={() => clickCard(dataCard.id)}

            onMouseLeave={() => setIsActive(false)} // Добавьте для обработки выхода курсора
        >
            <div className={`${styles.card} ${((isActive || dataCard.status == "completed") ? styles.active : "")}`}>
                <div className={styles.textWhite}>
                    {dataCard.id}
                </div>
            </div>

            {isPopupOpen && <Popup closePopup={closePopup} dataCard={dataCard} />}
        </div>
    )
}

export default Card