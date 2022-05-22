import styles from "./DatesAndGuests.module.css"
import useLocalStorage from "../../../hooks/useLocalStorage"
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";
import Guests from "./Guests";

export default function DatesAndGuests({ accommodation }) {

    const [totalPrice, setTotalPrice] = useLocalStorage("total", null)
    const [checkinDate, setCheckinDate] = useLocalStorage("checkinDate", null)
    const [checkOutDate, setCheckOutDate] = useLocalStorage("checkOutDate", null)
    const [startDate, setStartDate] = useState(new Date(checkinDate));
    const [endDate, setEndDate] = useState(new Date(checkOutDate));

    let total = accommodation.attributes.price

    if (startDate && endDate != null) {

        const time_difference = endDate - startDate;

        const days_difference = time_difference / (1000 * 60 * 60 * 24);

        total = total * days_difference
    }

    const formatedStartDate = DateTime.fromJSDate(startDate).toFormat('LLLL dd yyyy');
    const formatedEndDate = DateTime.fromJSDate(endDate).toFormat('LLLL dd yyyy');


    const onDatePickerChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        setCheckinDate(start)
        setCheckOutDate(end)
        setTotalPrice(total)
    }

    const CustomDatePickerButton = React.forwardRef(({ onClick }, ref) => (
        <p className={styles.changeDateButton} onClick={onClick} ref={ref}>Change</p>
    ));

    return (
        <div>
            <p className={styles.datesAndGuestsHeader}>Dates and guests</p>
            <div className={styles.datesContainer}>
                <div>
                    <p className={styles.datesParagraphHeader}>Dates</p>
                    <p className={styles.datesParagraph}>{formatedStartDate} - {formatedEndDate === "Invalid DateTime" ? "" : formatedEndDate}</p>
                </div>
                <div>
                    <DatePicker customInput={<CustomDatePickerButton />} onChange={onDatePickerChange} selected={startDate} startDate={startDate} endDate={endDate} minDate={new Date()} monthsShown={window.innerWidth < 700 ? 1 : 2} selectsRange />
                </div>
            </div>
            <Guests accommodation={accommodation} />
            <p className={styles.totalPrice}>Total: {total} NOK</p>
            <hr />
        </div>
    )
}