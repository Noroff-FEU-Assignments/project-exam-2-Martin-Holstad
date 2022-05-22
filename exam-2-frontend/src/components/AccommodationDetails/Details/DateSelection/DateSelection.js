import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateSelection.module.css"
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import ReserveButton from "./ReserveButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons"

export default function DateSelection({ accommodation }) {

    const defaultCheckoutDate = new Date();
    defaultCheckoutDate.setDate(defaultCheckoutDate.getDate() + 1);

    const [guestsAmount, setGuestsAmount] = useState(0);
    const [dateRange, setDateRange] = useState([new Date(), defaultCheckoutDate]);
    const [startDate, endDate] = dateRange;

    const time_difference = endDate - startDate;

    const days_difference = time_difference / (1000 * 60 * 60 * 24);

    let total = accommodation.attributes.price

    total = total * days_difference

    let guests = 0

    function handleMinusButton() {
        guests = guestsAmount - 1
        setGuestsAmount(guests)

        if (guests < 0) {
            setGuestsAmount(0)
        }
    }

    function handlePlusButton() {
        guests = guestsAmount + 1
        setGuestsAmount(guests)

        if (guests > accommodation.attributes.guests) {
            setGuestsAmount(accommodation.attributes.guests)
            alert(`This accommodation can only have ${accommodation.attributes.guests} guests`)
        }
    }

    return (
        <div className={styles.container}>
            <p className={styles.datePickerHeader}>Date selection</p>
            <label className={styles.datePickerLabel}>Checkin - checkout date</label>
            <DatePicker selectsRange={true} startDate={startDate} endDate={endDate} minDate={new Date()} dateFormat="LLLL dd, yyyy" monthsShown={window.innerWidth < 700 ? 1 : 2} onChange={(update) => { setDateRange(update); }} withPortal />
            <div className={styles.guestsContainer}>
                <p>Guests</p>
                <div className={styles.plusAndMinusContainer}>
                    <FontAwesomeIcon onClick={handleMinusButton} className={styles.minusButton} icon={faCircleMinus} />
                    <p>{guestsAmount}</p>
                    <FontAwesomeIcon onClick={handlePlusButton} className={styles.plusButton} icon={faCirclePlus} />
                </div>
            </div>
            <hr />
            <p className={styles.datePickerPrice}>Total: {total < accommodation.attributes.price ? total = accommodation.attributes.price : total} NOK</p>
            <ReserveButton accommodation={accommodation} guestsAmount={guestsAmount} total={total} startDate={startDate} endDate={endDate} />
        </div>
    );
}