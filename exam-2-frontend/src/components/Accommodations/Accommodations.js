import styles from "./Accommodations.module.css"
import { baseUrl } from "../../settings/BaseUrl";
import { useState, useEffect } from "react";
import { HeroImage } from "../common/HeroImage/HeroImage";
import Cards from "./Cards/Cards";
import FeaturedAccommodations from "../common/FeaturedAccommodations/FeaturedAccommodations"

export default function Accommodations() {

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
    <main>
      <HeroImage />
      <div className={styles.accommodationsContainer}>
        <h2 className={styles.accommodationsHeader}>Hotels, b&bs and guesthouses in Bergen</h2>
        <Cards accommodations={accommodations} />
      </div>
      <FeaturedAccommodations />
    </main>
  )
}