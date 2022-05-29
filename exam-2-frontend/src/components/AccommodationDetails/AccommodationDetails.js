import styles from "./AccommodationDetails.module.css"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { baseUrl } from "../../settings/BaseUrl";
import Details from "./Details/Details";
import LocationMap from "../common/LocationMap/LocationMap";
import FeaturedAccommodations from "../common/FeaturedAccommodations/FeaturedAccommodations";

export default function AccommodationDetails() {

  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = useParams()

  useEffect(function () {

    async function fetchAccommodation() {

      try {

        const response = await fetch(baseUrl + `/api/hotels/${id.id}?populate=*`)

        if (response.ok) {
          const json = await response.json()
          setAccommodation(json.data)
        }

      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(null)
      }

    }
    fetchAccommodation()
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }


  return (
    <main>
      <Details accommodation={accommodation} />
      <div className={styles.locationContainer}>
        <p className={styles.locationHeader}>Location</p>
        <p className={styles.locationAddress}>Address: {accommodation.attributes.address}</p>
        <LocationMap />
      </div>
      <FeaturedAccommodations />
    </main>
  )
}