import styles from "./DatesAndGuests.module.css"
import useLocalStorage from "../../hooks/useLocalStorage"
import React, { useState } from "react";
import { DateTime } from "luxon";


export default function DatesAndGuests({ accommodation }) {

    const [totalguests, setTotalguests] = useLocalStorage("guests", null)
    const [totalPrice, setTotalPrice] = useLocalStorage("total", null)
    const [checkinDate, setCheckinDate] = useLocalStorage("checkinDate", null)
    const [checkOutDate, setCheckOutDate] = useLocalStorage("checkOutDate", null)

    let total = accommodation.attributes.price


    const time_difference = checkOutDate - checkinDate;

    const days_difference = time_difference / (1000 * 60 * 60 * 24);

    total = total * days_difference



    return (
        <div>
            <p className={styles.datesAndGuestsHeader}>Dates and guests</p>
            <div>
                <p className={styles.datesParagraphHeader}>Dates</p>
                <p className={styles.datesParagraph}>{DateTime.fromISO(checkinDate).toFormat('LLLL dd yyyy')} - {DateTime.fromISO(checkOutDate).toFormat('LLLL dd yyyy')}</p>
            </div>
            <div>
                <p className={styles.guestsParagraphHeader}>Guests</p>
                <p className={styles.guestsParagraph}>{totalguests} guests</p>
            </div>
            <p className={styles.totalPrice}>Total: {totalPrice} NOK</p>
            <hr />
        </div>
    )
}