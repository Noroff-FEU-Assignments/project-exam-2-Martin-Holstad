import styles from "./TypeOfStaying.module.css"

export default function TypeOfStaying({ setTypeOfStayingValue }) {

    function handleTypeOfStaying(event) {
        console.log(event.target.value);
        setTypeOfStayingValue(event.target.value)
    }

    return (
        <>
            <p className={styles.typeOfStayingHeader}>Type of staying</p>

            <select className={styles.typeOfStayingSelect} onChange={handleTypeOfStaying}>
                <option value="">All</option>
                <option value="hotel" >Hotel</option>
                <option value="bed_and_breakfast">Bed and breakfast</option>
                <option value="guest_house">Guesthouse</option>
            </select>
        </>
    )
}