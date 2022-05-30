import styles from "./Home.module.css"
import { HeroImage } from "../common/HeroImage/HeroImage"
import FeaturedAccommodations from "../common/FeaturedAccommodations/FeaturedAccommodations"
import LocationMap from "../common/LocationMap/LocationMap"
import { Link } from "react-router-dom";

export default function Home() {

  return (
    <>
      <main>
        <HeroImage />
        <div className={styles.buttonContainer}>
          <Link className={styles.a} to="/accommodations">
            <div className={styles.seeAllAccommodationsButton}>See all Accommodations</div>
          </Link>
        </div>

        <div className={styles.locationContainer}>
          <p className={styles.locationHeader}>Location</p>
          <p className={styles.locationAddress}>Address: Bergen</p>
          <LocationMap />
        </div>
        <FeaturedAccommodations />
      </main>
    </>
  )
}