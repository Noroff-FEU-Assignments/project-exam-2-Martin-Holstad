import styles from "./Guests.module.css"
import useLocalStorage from "../../../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons"

export default function GuestsButtons({ accommodation }) {

    const [totalguests, setTotalguests] = useLocalStorage("guests", null)

    let guests = 0

    function handleMinusButton() {
        guests = totalguests - 1
        setTotalguests(guests)

        if (guests < 0) {
            setTotalguests(0)
        }
    }

    function handlePlusButton() {
        guests = totalguests + 1
        setTotalguests(guests)

        if (guests > accommodation.attributes.guests) {
            setTotalguests(accommodation.attributes.guests)
            alert(`This accommodation can only have ${accommodation.attributes.guests} guests`)
        }
    }

    return (
        <div className={styles.Container}>
            <div>
                <p className={styles.ParagraphHeader}>Guests</p>
                <p className={styles.Paragraph}>{totalguests} guests</p>
            </div>
            <div className={styles.plusAndMinusContainer}>
                <FontAwesomeIcon onClick={handleMinusButton} className={styles.minusButton} icon={faCircleMinus} />
                <p>{totalguests}</p>
                <FontAwesomeIcon onClick={handlePlusButton} className={styles.plusButton} icon={faCirclePlus} />
            </div>
        </div>
    )
}