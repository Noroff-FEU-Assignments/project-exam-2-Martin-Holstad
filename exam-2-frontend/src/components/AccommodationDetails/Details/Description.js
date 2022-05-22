import styles from "./Description.module.css"
import StarRating from "../../common/StarRating/StarRating"
import DateSelection from "./DateSelection/DateSelection"

export default function Description({ accommodation }) {

    return (
        <div>
            <div className={styles.ratingContainer}>
                <StarRating fontSize={18} rating={accommodation.attributes.rating} />
                <p className={styles.rating}>{accommodation.attributes.rating}</p>
            </div>
            <p className={styles.price}>{accommodation.attributes.price} NOK / night</p>
            <p className={styles.description}>{accommodation.attributes.description}</p>
            <p className={styles.roomName}>{accommodation.attributes.room_name}</p>
            <p className={styles.roomInfo}>{accommodation.attributes.guests} Guests - {accommodation.attributes.beds} Beds - {accommodation.attributes.bathrooms} Bathrooms - {accommodation.attributes.kitchens} kitchens</p>
            <DateSelection accommodation={accommodation} />
        </div>
    )
}