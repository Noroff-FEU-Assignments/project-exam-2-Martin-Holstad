import styles from "./LocationMap.module.css"
import Location from "./Location"

export default function LocationMap({ accommodation }) {

    return (
        <div className={styles.locationContainer}>
            <p className={styles.locationHeader}>Location</p>
            <p className={styles.locationAddress}>Address: {accommodation.attributes.address}</p>
            <Location />
        </div>
    )
}