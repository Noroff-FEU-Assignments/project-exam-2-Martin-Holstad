import styles from "./Reservation.module.css"
import { baseUrl } from "../../settings/BaseUrl";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Description from "./Description";
import ReservationForm from "./ReservationForm";
import DatesAndGuests from "./DatesAndGuests";

export default function Reservation() {

    const [accommodation, setAccommodation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const id = useParams()

    useEffect(function () {

        async function fetchAccommodation() {

            try {

                const response = await fetch(baseUrl + `/api/hotels/${id.id}?populate=*`)

                if (response.ok) {
                    const json = await response.json()
                    setAccommodation(json.data)
                }

            } catch (error) {
                console.log(error);
                setError(error.toString());
            } finally {
                setLoading(null)
            }

        }
        fetchAccommodation()
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error occured: {error}</div>;
    }

    return (
        <main className={styles.main}>
            <Link to="/">
                <p className={styles.logo}>Holidaze</p>
            </Link>
            <h1 className={styles.h1}>Staying information</h1>
            <hr className={styles.h1Hr} />
            <div className={styles.gridContainer}>
                <div className={styles.gridOrder}>
                    <DatesAndGuests accommodation={accommodation} />
                    <ReservationForm accommodation={accommodation} />
                </div>
                <div>
                    <Description accommodation={accommodation} />
                </div>
            </div>
        </main>
    )
}