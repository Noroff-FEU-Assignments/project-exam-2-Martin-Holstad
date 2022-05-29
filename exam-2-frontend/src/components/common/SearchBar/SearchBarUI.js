import styles from "./SearchBarUI.module.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating";

export function SearchBarUI({ accommodations }) {

    const [searchValue, setSearchValue] = useState("")
    const [dropdownVisual, setDropdownVisual] = useState(styles.hide);

    function handleSearchInout(event) {

        setSearchValue(event.target.value.toLowerCase())

        if (event.target.value.trim().length > 0) {
            setDropdownVisual(styles.show)
        } else {
            setDropdownVisual(styles.hide)
        }
    }

    function clearButton() {
        setSearchValue("")
        setDropdownVisual(styles.hide)
    }

    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <p className={styles.header}>Search hotels, B&Bs and guesthouses in Bergen</p>

                <div className={styles.inputAndButtonContainer}>
                    <div className={styles.dropdownMenuContainer}>
                        <input onChange={handleSearchInout} className={styles.searchInput} value={searchValue} type="text" name="search" id="search" autoComplete="off" placeholder="Search" />

                        <ul className={styles.ul}>
                            {accommodations.filter(accommodation => accommodation.attributes.name.toLowerCase().includes(searchValue)).map(function (filteredAccommodation) {
                                return (
                                    <li key={filteredAccommodation.id} className={`${dropdownVisual} ${styles.li}`}>
                                        <Link to={`/accommodation-details/${filteredAccommodation.id}?=${filteredAccommodation.attributes.name}`}>
                                            <div className={styles.dropdownMenuBody}>
                                                <div className={styles.imageContainer}>
                                                    <img src={filteredAccommodation.attributes.main_image.data.attributes.url} alt={filteredAccommodation.attributes.name} />
                                                </div>
                                                <div>
                                                    <p className={styles.dropdownName}> {filteredAccommodation.attributes.name}</p>
                                                    <p className={styles.dropdownAddress}>Address: {filteredAccommodation.attributes.address}</p>
                                                    <StarRating fontSize={12} rating={filteredAccommodation.attributes.rating} />
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>

                    </div>
                    <div onClick={clearButton} className={styles.clearButton}>Clear</div>
                </div>

            </div>
        </div >
    )
}