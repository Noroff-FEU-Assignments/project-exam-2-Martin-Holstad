import styles from "./Cards.module.css"
import { baseUrl } from "../../../settings/BaseUrl"
import { Link } from "react-router-dom";
import StarRating from "../../common/StarRating/StarRating"


export default function Cards({ accommodations }) {

    /*filter(accommodation => accommodation.attributes.name.toLowerCase().includes(searchNameValue) && accommodation.attributes.category.includes(hotelCheckbox || bAndBCheckbox || guestHousesCheckbox))*/
    return (
        <div className={styles.cardsContainer}>
            {accommodations.map((accommodation) =>
                <div key={accommodation.id} className={styles.card}>
                    <Link to={`/accommodation-details/${accommodation.id}?=${accommodation.attributes.name}`}>
                        <img className={styles.cardImg} src={baseUrl + accommodation.attributes.main_image.data.attributes.url} alt={accommodation.attributes.main_image.data.attributes.alternativeText} />
                        <div className={styles.cardBody}>
                            <p className={styles.cardName}>{accommodation.attributes.name}</p>
                            <div className={styles.cardRatingContainer}>
                                <StarRating fontSize={16} rating={accommodation.attributes.rating} />
                                <div className={styles.cardRating}>{accommodation.attributes.rating}</div>
                            </div>
                            <div>
                            </div>
                            <p className={styles.cardDescription}>{accommodation.attributes.description}</p>
                            <p className={styles.cardPrice}>{accommodation.attributes.price} NOK / night</p>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    )
}