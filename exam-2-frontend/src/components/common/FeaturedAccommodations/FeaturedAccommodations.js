import styles from "./FeaturedAccommodations.module.css"
import { baseUrl } from "../../../settings/BaseUrl";
import { useState, useEffect } from "react";
import StarRating from "../../common/StarRating/StarRating"

export default function FeaturedAccommodations() {

  const [accommodations, setAccommodations] = useState([]);

  useEffect(function () {
    async function fetchAccommodations() {

      try {

        const response = await fetch(baseUrl + "/api/hotels?populate=*")

        if (response.ok) {
          const json = await response.json()
          setAccommodations(json.data)
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchAccommodations()

  }, [])

  return (
    <div className={styles.featuredAccommodationsContainer}>
      <h2
        className={styles.featuredAccommodationsHeader}>Recommendations
      </h2>
      <div className={styles.cardsContainer}>
        {accommodations.map(function (accommodation) {
          return (
            accommodation.attributes.featured_hotel ? (
              <div key={accommodation.id} className={styles.card}>
                <img className={styles.cardImg} src={baseUrl + accommodation.attributes.main_image.data.attributes.url} alt={accommodation.attributes.main_image.data.attributes.alternativeText} />
                <div className={styles.cardBody}>
                  <p className={styles.cardName}>{accommodation.attributes.name}</p>
                  <div className={styles.cardRatingContainer}>
                    <StarRating fontSize={16} rating={accommodation.attributes.rating} />
                    <div className={styles.cardRating}>{accommodation.attributes.rating}</div>
                  </div>
                  <p className={styles.cardDescription}>{accommodation.attributes.description}</p>
                  <p className={styles.cardPrice}>{accommodation.attributes.price} NOK / night</p>
                </div>
              </div>
            ) : ("")
          )
        })}
      </div>
    </div>
  )
}