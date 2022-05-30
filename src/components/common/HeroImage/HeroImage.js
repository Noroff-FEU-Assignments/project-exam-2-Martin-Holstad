import styles from "./HeroImage.module.css"
import { useState, useEffect } from "react";
import { baseUrl } from "../../../settings/BaseUrl"
import SearchBar from "../SearchBar/SearchBar";

export function HeroImage() {

    const [image, setImage] = useState(null)
    const [alternativeText, setAlternativeText] = useState(null)

    useEffect(function () {

        async function fetchImage() {

            try {

                const response = await fetch(baseUrl + "/api/hero-banner?populate=*")
                const json = await response.json()

                setImage(json.data.attributes.banner.data.attributes.url)
                setAlternativeText(json.data.attributes.banner.data.attributes.alternativeText)
            } catch (error) {
                console.log(error);
            }
        }
        fetchImage()

    })

    return (
        <div className={styles.heroImageContainer}>
            <div className={styles.heroImage} style={{ backgroundImage: `url(${image})` }} alt={alternativeText}>
                <SearchBar />

            </div>
            <div>
            </div>
        </div>
    )
}