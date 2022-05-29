import styles from "./PopularFilter.module.css"

export default function PopularFilter({ setBathroomIncluded, setkitchenIncluded, setBedsIncluded, setNumberofGuests }) {


    function handleBathroomCheckBox(event) {
        if (event.target.checked) {
            setBathroomIncluded(1)
        } else {
            setBathroomIncluded(0)
        }
    }

    function handleKitchenCheckBox(event) {
        if (event.target.checked) {
            setkitchenIncluded(1)
        } else {
            setkitchenIncluded(0)
        }
    }

    function handleBedsInput(event) {
        setBedsIncluded(event.target.value)
    }

    function handleGuestsInput(event) {
        setNumberofGuests(event.target.value)
    }

    return (
        <div className={styles.popularFiletersContainer}>
            <p className={styles.popularFiltersHeader}>Popular filters</p>

            <div className={styles.popularFilterCheckboxContainer}>
                <input type="checkbox" onChange={handleBathroomCheckBox} />
                <label className={styles.test}>Bathroom included</label>
            </div>

            <div className={styles.popularFilterCheckboxContainer}>
                <input type="checkbox" onChange={handleKitchenCheckBox} />
                <label>Kitchen included</label>
            </div>

            <div className={styles.popularFilterBedsContainer}>
                <label htmlFor="beds">How many beds</label>
                <input placeholder="Beds" name="beds" type="number" onChange={handleBedsInput} />
            </div>

            <div className={styles.popularFilterGuestsContainer}>
                <label>How many guests</label>
                <input className={styles.popularFiltersInput} placeholder="Guests" name="guests" type="number" onChange={handleGuestsInput} />
            </div>
        </div>
    )
}