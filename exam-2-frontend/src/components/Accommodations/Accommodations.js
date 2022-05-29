import styles from "./Accommodations.module.css"
import { baseUrl } from "../../settings/BaseUrl";
import { useState, useEffect } from "react";
import { HeroImage } from "../common/HeroImage/HeroImage";
import Cards from "./Cards/Cards";
import FeaturedAccommodations from "../common/FeaturedAccommodations/FeaturedAccommodations"
import LocationMap from "../common/LocationMap/LocationMap"
import ComponentLoader from "../common/Loaders/ComponentLoader";
import DisplayMessage from "../common/DisplayMessage/DisplayMessage";

export default function Accommodations() {

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
    <main>
      <HeroImage />
      <div className={styles.accommodationsContainer}>
        <h2 className={styles.accommodationsHeader}>Hotels, b&bs and guesthouses in Bergen</h2>
        <div>{message}</div>
        <Cards accommodations={accommodations} message={message} />
      </div>

      <div className={styles.locationContainer}>
        <p className={styles.locationHeader}>Location</p>
        <p className={styles.locationAddress}>Address: Bergen</p>
        <LocationMap />
      </div>
      <FeaturedAccommodations />
    </main>
  )
}