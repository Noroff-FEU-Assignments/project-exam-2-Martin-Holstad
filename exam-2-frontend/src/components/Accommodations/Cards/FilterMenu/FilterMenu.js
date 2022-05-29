import styles from "./FilterMenu.module.css"
import { useState } from "react";
import SearchByName from "./SearchByName";
import PopularFilter from "./PopularFilter";
import Rating from "./Rating";
import TypeOfStaying from "./TypeOfStaying";
import Price from "./Price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faChevronLeft } from "@fortawesome/free-solid-svg-icons"


export default function FilterMenu({ setFilterMenuVisual, setSearchNameValue, setBathroomIncluded, setkitchenIncluded, setBedsIncluded, setNumberofGuests, setTypeOfStayingValue, setPriceValue, setRatingValue }) {


    function handleFilterButton() {
        setFilterMenuVisual(false)
    }

    return (

        <div className={styles.filterMenuBackGroundColour}>
            <div className={styles.filterMenuContainer}>
                <div className={styles.closeMenuArrowButtonContainer}>
                    <FontAwesomeIcon className={styles.closeMenuArrowButton} icon={faChevronLeft} onClick={handleFilterButton} />
                </div>
                <SearchByName setSearchNameValue={setSearchNameValue} />
                <hr className={styles.hr} />
                <PopularFilter setBathroomIncluded={setBathroomIncluded} setkitchenIncluded={setkitchenIncluded} setBedsIncluded={setBedsIncluded} setNumberofGuests={setNumberofGuests} />
                <hr className={styles.hr} />
                <TypeOfStaying setTypeOfStayingValue={setTypeOfStayingValue} />
                <hr className={styles.hr} />
                <Price setPriceValue={setPriceValue} />
                <hr className={styles.hr} />
                <Rating setRatingValue={setRatingValue} />
            </div>

            <FontAwesomeIcon className={styles.closeMenuCrossButton} icon={faXmark} onClick={handleFilterButton} />
        </div>
    )
}