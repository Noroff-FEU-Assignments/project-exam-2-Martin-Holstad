import styles from "./Details.module.css"
import Images from "./Images"
import Description from "./Description"

export default function Details({ accommodation }) {

    return (
        <div className={styles.container}>
            <div>
                <h1 className={styles.h1}>{accommodation.attributes.name}</h1>
                <p className={styles.address}>Address: {accommodation.attributes.address}</p>
                <div className={styles.imagesAndDescriptionContainer}>
                    <Images accommodation={accommodation} />
                    <Description accommodation={accommodation} />
                </div>
            </div>
        </div>
    )
}