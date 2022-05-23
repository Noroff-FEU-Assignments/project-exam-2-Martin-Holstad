import styles from "./ContactMessages.module.css"
import { baseUrl } from "../../../../../../settings/BaseUrl";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import useLocalStorage from "../../../../../../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical, faAngleLeft } from "@fortawesome/free-solid-svg-icons"

export default function ContactMessages() {

    const [auth, setAuth] = useLocalStorage("jwt", null)
    const [contactMessages, setContactMessages] = useState([]);
    const [contactMessageContainerOpen, setContactMessageContainerOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [created, setCreated] = useState("");
    const [subject, setSubject] = useState("");

    useEffect(function () {

        async function fetchContactMessages() {

            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`
                }
            };

            try {

                const response = await fetch(baseUrl + "/api/contact-messages", options)

                if (response.ok) {
                    const json = await response.json()
                    setContactMessages(json.data)
                    console.log(json.data);
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchContactMessages()

    }, [])

    function onListClick(event) {
        setName(event.target.dataset.name)
        setSubject(event.target.dataset.subject)
        setEmail(event.target.dataset.email)
        setMessage(event.target.dataset.message)
        setCreated(event.target.dataset.created)
        setContactMessageContainerOpen(true)
    }

    function toggleSpecificContainerVisual() {
        setContactMessageContainerOpen(false)
    }

    return (
        <>
            {contactMessages.map(function (messages) {
                return (
                    <ul className={`${styles.ul} ${contactMessageContainerOpen ? styles.hide : styles.show}`} key={messages.id} onClick={onListClick} data-name={messages.attributes.name} data-subject={messages.attributes.subject} data-message={messages.attributes.message} data-email={messages.attributes.email} data-created={messages.attributes.createdAt}>
                        <li className={styles.li}>
                            <p className={styles.from}>From: <span className={styles.fromName}>{messages.attributes.name}</span></p>
                            <p className={styles.subject}>Subject: <span className={styles.subjectText}>{messages.attributes.subject}</span></p>
                            <p className={styles.date}>{DateTime.fromISO(messages.attributes.createdAt).toFormat('DD')}</p>
                        </li>
                    </ul>
                )
            })}
            <div className={`${styles.contactMessageContainer} ${!contactMessageContainerOpen ? styles.hide : styles.show}`}>
                <FontAwesomeIcon className={styles.contactMessageGoBackButton} onClick={toggleSpecificContainerVisual} icon={faAngleLeft} />
                <hr />
                <div className={styles.contactMessageBody}>
                    <div className={styles.contactMessageFromAndDateContainer}>
                        <p className={styles.contactMessageFrom}><span>From:</span> {name}</p>
                        <div className={styles.contactMessageDateAndMenuIconContainer}>
                            <p>{!created ? "" : DateTime.fromISO(created).toFormat('DD')}</p>
                            <FontAwesomeIcon className={styles.contactMessageMenuIcon} icon={faEllipsisVertical} />
                        </div>
                    </div>
                    <p className={styles.contactMessageSubject}><span>Subject:</span> {subject}</p>
                    <p className={styles.contacMessageMessage}>{message}</p>
                    <p className={styles.contactMessageEmail}><span>Email:</span> {email}</p>
                </div>
            </div>
        </>
    )
}