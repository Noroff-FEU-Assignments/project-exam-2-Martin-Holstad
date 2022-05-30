import styles from "./EnquirysMessages.module.css"
import { baseUrl } from "../../../../../../settings/BaseUrl";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import _ from "lodash";
import useLocalStorage from "../../../../../../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, } from "@fortawesome/free-solid-svg-icons"
import DisplayMessage from "../../../../../common/DisplayMessage/DisplayMessage"
import DeleteEnquiryButton from "./DeleteEnquiryButton";
import MarkEnquiryAsRead from "./MarkEnquiryAsRead";
import ComponentLoader from "../../../../Loaders/ComponentLoader";

export default function EnquirysMessages({ setUpdateApi }) {

    const [auth, setAuth] = useLocalStorage("jwt", null)
    const [enquirys, setEnquirys] = useState([]);
    const [displayMessage, setDisplayMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [enquiryContainerOpen, setEnquiryContainerOpen] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [created, setCreated] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [reservationFor, setReservationFor] = useState("");
    const [roomName, setRoomName] = useState("");
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [guests, setGuests] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(function () {

        async function fetchEnquirysMessages() {

            setUpdateApi(update)
            setLoading(true)

            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`
                }
            };

            try {

                const response = await fetch(baseUrl + "/api/enquiries", options)

                if (response.ok) {
                    const json = await response.json()
                    setEnquirys(_.reverse(json.data))
                    setDisplayMessage(json.data.length === 0 ? <DisplayMessage messageType="normal" >No messages to show</DisplayMessage> : null)
                }

                if (!response.ok) {
                    setDisplayMessage(<DisplayMessage messageType="error" >Oops! something went wrong</DisplayMessage>)
                }

            } catch (error) {
                console.log(error);
                setDisplayMessage(<DisplayMessage messageType="error" >Oops! something went wrong</DisplayMessage>)
            } finally {
                setUpdate(false)
                setLoading(false)
            }
        }
        fetchEnquirysMessages()
    }, [update])

    if (loading) {
        return <div className={styles.loaderContainer}><ComponentLoader /></div>
    }

    function onListClick(event) {
        setId(event.target.dataset.id)
        setName(event.target.dataset.name)
        setCreated(event.target.dataset.created)
        setEmail(event.target.dataset.email)
        setPhone(event.target.dataset.phone)
        setReservationFor(event.target.dataset.reservation_for)
        setRoomName(event.target.dataset.room_name)
        setCheckin(event.target.dataset.checkin)
        setCheckout(event.target.dataset.checkout)
        setGuests(event.target.dataset.guests)
        MarkEnquiryAsRead(event.target.dataset.id, auth)
        setEnquiryContainerOpen(true)
        setUpdate(true)
    }

    function toggleEnquiryContainerVisual() {
        setEnquiryContainerOpen(false)
        setUpdate(true)
    }

    return (
        <>

            <div>{displayMessage}</div>

            {enquirys.map(function (enquirys) {
                return (
                    <ul key={enquirys.id} className={`${enquirys.attributes.new_enquiry_message ? styles.newEnquiryUlContainer : styles.ulContainer} ${enquiryContainerOpen ? styles.hide : styles.show}`} onClick={onListClick} data-id={enquirys.id} data-name={enquirys.attributes.name} data-created={enquirys.attributes.createdAt} data-email={enquirys.attributes.email} data-phone={enquirys.attributes.phone} data-reservation_for={enquirys.attributes.reservation_for} data-room_name={enquirys.attributes.room_name} data-checkin={enquirys.attributes.checkin} data-checkout={enquirys.attributes.checkout} data-guests={enquirys.attributes.guests}>
                        <li className={styles.li}>
                            <p className={styles.from}><span>From:</span> {enquirys.attributes.name}</p>
                            <p className={styles.reservationFor}><span>For:</span> {enquirys.attributes.reservation_for}</p>
                            <p className={styles.date}>{DateTime.fromISO(enquirys.attributes.createdAt).toFormat('DD')}</p>
                        </li>
                    </ul>
                )
            })}
            <div className={`${styles.enquiryContainer} ${!enquiryContainerOpen ? styles.hide : styles.show}`}>
                <FontAwesomeIcon className={styles.enquiryGoBackButton} onClick={toggleEnquiryContainerVisual} icon={faAngleLeft} />
                <hr />
                <div className={styles.enquiryBody}>
                    <div className={styles.enquiryNameAndDateContainer}>
                        <p className={styles.enquiryName}><span>From:</span> {name}</p>
                        <div className={styles.enquiryDateAndDeleteIconContainer}>
                            <p>{!created ? "" : DateTime.fromISO(created).toFormat('DD')}</p>
                            <DeleteEnquiryButton id={id} auth={auth} toggleEnquiryContainerVisual={toggleEnquiryContainerVisual} />
                        </div>
                    </div>
                    <p className={styles.enquiryEmail}><span>Email:</span> {email}</p>
                    <p className={styles.enquiryPhone}><span>Phone:</span> {phone}</p>
                    <p className={styles.enquiryReservationFor}><span>Reservation for:</span> {reservationFor}</p>
                    <p className={styles.enquiryRoomName}><span>Room:</span> {roomName}</p>
                    <p className={styles.enquiryDates}><span>Dates:</span> {DateTime.fromISO(checkin).toFormat('DD')} - {DateTime.fromISO(checkout).toFormat('DD')}</p>
                    <p className={styles.enquiryGuests}><span>Guests:</span> {guests}</p>
                </div>
            </div>

        </>
    )
}
