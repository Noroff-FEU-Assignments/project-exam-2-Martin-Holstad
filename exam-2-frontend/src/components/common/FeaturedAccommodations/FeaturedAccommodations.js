import styles from "./FeaturedAccommodations.module.css"
import { baseUrl } from "../../../settings/BaseUrl";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StarRating from "../../common/StarRating/StarRating"
import ComponentLoader from "../Loaders/ComponentLoader";
import DisplayMessage from "../DisplayMessage/DisplayMessage";

export default function FeaturedAccommodations() {

    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(false);

    useEffect(function () {
        async function fetchAccommodations() {

            setLoading(true)

            try {

                const response = await fetch(baseUrl + "/api/hotels?populate=*")

                if (response.ok) {
                    const json = await response.json()
                    setAccommodations(json.data)
                }

                if (!response.ok) {
                    setMessage(<DisplayMessage messageType="error">Oops! Something went wrong...</DisplayMessage>)
                }

            } catch (error) {
                console.log(error);
                setMessage(<DisplayMessage messageType="error">Oops! Something went wrong...</DisplayMessage>)
            } finally {
                setLoading(false)
            }
        }
        fetchAccommodations()

    }, [])

    if (loading) {
        return <div className={styles.loaderContainer}><ComponentLoader /></div>
    }

    return (
        <div className={styles.featuredAccommodationsContainer}>
            <h2 className={styles.featuredAccommodationsHeader}>Recommendations</h2>
            <div>{message}</div>
            <div className={styles.cardsContainer}>
                {accommodations.map(function (accommodation) {
                    return (
                        accommodation.attributes.featured_hotel ? (
                            <div key={accommodation.id} className={styles.card}>
                                <Link to={`/accommodation-details/${accommodation.id}?=${accommodation.attributes.name}`}>
                                    <img className={styles.cardImg} src={accommodation.attributes.main_image.data.attributes.url} alt={accommodation.attributes.main_image.data.attributes.alternativeText} />
                                    <div className={styles.cardBody}>
                                        <p className={styles.cardName}>{accommodation.attributes.name}</p>
                                        <div className={styles.cardRatingContainer}>
                                            <StarRating fontSize={16} rating={accommodation.attributes.rating} />
                                            <div className={styles.cardRating}>{accommodation.attributes.rating}</div>
                                        </div>
                                        <p className={styles.cardDescription}>{accommodation.attributes.description}</p>
                                        <p className={styles.cardPrice}>{accommodation.attributes.price} NOK / night</p>
                                    </div>
                                </Link>
                            </div>
                        ) : ("")
                    )
                })}
            </div>
        </div>
    )
}