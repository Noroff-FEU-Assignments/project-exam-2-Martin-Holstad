import styles from "./Cards.module.css"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import StarRating from "../../common/StarRating/StarRating"
import FilterMenu from "./FilterMenu/FilterMenu";


export default function Cards({ accommodations }) {

    /*filter(accommodation => accommodation.attributes.name.toLowerCase().includes(searchNameValue) && accommodation.attributes.category.includes(hotelCheckbox || bAndBCheckbox || guestHousesCheckbox))*/
    const [searchNameValue, setSearchNameValue] = useState("");
    const [typeOfStayingValue, setTypeOfStayingValue] = useState("");
    const [bathroomIncluded, setBathroomIncluded] = useState(0);
    const [kitchenIncluded, setkitchenIncluded] = useState(0);
    const [bedsIncluded, setBedsIncluded] = useState(0);
    const [numberofGuests, setNumberofGuests] = useState(0);
    const [priceValue, setPriceValue] = useState(0);
    const [ratingValue, setRatingValue] = useState(0);
    const [filterMenuVisual, setFilterMenuVisual] = useState(false);

    function handleFilterButton() {


        if (filterMenuVisual === false) {
            setFilterMenuVisual(true)
        } else {
            setFilterMenuVisual(false)
        }
    }

    return (
        <>
            <div className={styles.filterButton} onClick={handleFilterButton}>Filter</div>
            <div className={styles.filterMenuAndCardsContainer}>
                <div className={styles.desktopFilterMenu}>
                    <FilterMenu setFilterMenuVisual={setFilterMenuVisual} setSearchNameValue={setSearchNameValue} setBathroomIncluded={setBathroomIncluded} setkitchenIncluded={setkitchenIncluded} setBedsIncluded={setBedsIncluded} setNumberofGuests={setNumberofGuests} setTypeOfStayingValue={setTypeOfStayingValue} setPriceValue={setPriceValue} setRatingValue={setRatingValue} />
                </div>
                <div className={`${filterMenuVisual ? "" : styles.hide}`}>
                    <FilterMenu setFilterMenuVisual={setFilterMenuVisual} setSearchNameValue={setSearchNameValue} setBathroomIncluded={setBathroomIncluded} setkitchenIncluded={setkitchenIncluded} setBedsIncluded={setBedsIncluded} setNumberofGuests={setNumberofGuests} setTypeOfStayingValue={setTypeOfStayingValue} setPriceValue={setPriceValue} setRatingValue={setRatingValue} />
                </div>
                <div className={styles.cardsContainer}>
                    {accommodations.filter(accommodation => accommodation.attributes.name.toLowerCase().includes(searchNameValue) &&
                        accommodation.attributes.hotel_type.includes(typeOfStayingValue) &&
                        accommodation.attributes.bathrooms >= bathroomIncluded &&
                        accommodation.attributes.kitchens >= kitchenIncluded &&
                        accommodation.attributes.beds >= bedsIncluded &&
                        accommodation.attributes.beds >= numberofGuests &&
                        accommodation.attributes.price >= priceValue &&
                        accommodation.attributes.rating >= ratingValue).map((accommodation) =>

                            <div key={accommodation.id} className={styles.card}>
                                <Link to={`/accommodation-details/${accommodation.id}?=${accommodation.attributes.name}`}>
                                    <img className={styles.cardImg} src={accommodation.attributes.main_image.data.attributes.url} alt={accommodation.attributes.main_image.data.attributes.alternativeText} />
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
            </div>
        </>
    )
}