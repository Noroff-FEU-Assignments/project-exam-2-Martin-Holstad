import styles from "./ReserveButton.module.css"
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { Link } from "react-router-dom";

export default function ReserveButton({ accommodation, guestsAmount, total, startDate, endDate }) {

    const [guests, setGuests] = useLocalStorage("guests", null)
    const [totalPrice, setTotalPrice] = useLocalStorage("total", null)
    const [checkinDate, setCheckinDate] = useLocalStorage("checkinDate", null)
    const [checkOutDate, setCheckOutDate] = useLocalStorage("checkOutDate", null)

    function handleOnclick() {
        if (guestsAmount === 0) {
            alert("Need to add guests")
        } else {
            setGuests(guestsAmount)
            setTotalPrice(total)
            setCheckinDate(startDate)
            setCheckOutDate(endDate)
        }
    }

    return (
        <Link onClick={handleOnclick} to={guestsAmount === 0 ? "" : `/reservation/${accommodation.id}?=${accommodation.attributes.name}`}>
            <div className={styles.reserveButton}>Reserve</div>
        </Link>
    )
}