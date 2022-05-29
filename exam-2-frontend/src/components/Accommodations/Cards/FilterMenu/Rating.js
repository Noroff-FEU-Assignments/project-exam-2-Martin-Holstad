import styles from "./Rating.module.css"

export default function Rating({ setRatingValue }) {

    function handleRatingSelect(event) {
        setRatingValue(event.target.value);
    }

    return (
        <>
            <p className={styles.filterRatingHeader}>Rating</p>
            <select className={styles.filterRatingSelect} onChange={handleRatingSelect}>
                <option value="0">All</option>
                <option value="1" >1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5" >5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </>
    )
}