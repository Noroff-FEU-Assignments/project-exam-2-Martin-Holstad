import styles from "./Description.module.css"
import StarRating from "../common/StarRating/StarRating"
export default function Description({ accommodation }) {

  return (
    <div className={styles.container}>
      <div className={styles.ratingContainer}>
        <StarRating fontSize={18} rating={accommodation.attributes.rating} />
        <p className={styles.rating}>{accommodation.attributes.rating}</p>
      </div>
      <div>
        <p className={styles.name}>{accommodation.attributes.name}</p>
        <p className={styles.address}>Address: {accommodation.attributes.address}</p>
        <img className={styles.image} src={accommodation.attributes.main_image.data.attributes.url} alt={accommodation.attributes.main_image.data.attributes.alternativeText} />
        <p className={styles.description}>{accommodation.attributes.description}</p>
        <p className={styles.price}>{accommodation.attributes.price} NOK / night</p>
      </div>
    </div>
  )
}