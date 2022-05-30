import styles from "./Images.module.css"
import { useState } from "react";

export default function Images({ accommodation }) {

    const [imageSource, setImageSource] = useState(accommodation.attributes.main_image.data.attributes.url);
    const [alternativeText, setAlternativeText] = useState(accommodation.attributes.main_image.data.attributes.alternativeText);

    function handleImageChange(event) {

        setImageSource(event.target.src);
        setAlternativeText(event.target.alt)
    }


    return (
        <div>
            <img className={styles.mainImage} src={imageSource} alt={alternativeText} />
            <div className={styles.subImagesContainer}>
                <img onMouseOver={handleImageChange} onClick={handleImageChange} className={styles.subImages} src={accommodation.attributes.main_image.data.attributes.url} alt={accommodation.attributes.main_image.data.attributes.alternativeText} />
                {accommodation.attributes.images.data.map((image) =>
                    <img key={image.id} onMouseOver={handleImageChange} onClick={handleImageChange} className={styles.subImages} src={image.attributes.url} alt={image.attributes.alternativeText} />
                )}
            </div>
        </div>
    )
}