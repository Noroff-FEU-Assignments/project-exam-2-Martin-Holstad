import styles from "./LocationMap.module.css"
import Location from "./Location"

export default function LocationMap() {

    return (
        <div className={styles.locationContainer}>
            <Location />
        </div>
    )
}