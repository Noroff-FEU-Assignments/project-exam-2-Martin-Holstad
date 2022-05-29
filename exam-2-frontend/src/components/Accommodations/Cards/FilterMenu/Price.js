import styles from "./Price.module.css"

export default function Price({ setPriceValue }) {

    function handlePriceInput(event) {
        setPriceValue(event.target.value)
    }

    return (
        <div className={styles.filterPriceContainer}>
            <p className={styles.filterpriceHeader}>Price</p>
            <input placeholder="Price" name="price" type="number" onChange={handlePriceInput} />
        </div>
    )
}