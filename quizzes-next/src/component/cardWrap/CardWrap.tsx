import { ServiceData } from "@/service/ServiceCard"
import Card from "../card/Card"
import styles from "./CardWrap.module.css"

const CardWrap: React.FC = async () => {

    const data = await ServiceData.GetCardDataAll()

    return (
        <div className={styles.cardWrap} >
            {data ? data.map((cardData, index) => (
                <Card key={index} dataCard={cardData} />
            )) : null}
        </div>
    )
}
export default CardWrap