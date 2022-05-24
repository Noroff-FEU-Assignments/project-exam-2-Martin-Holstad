import styles from "./ContactMessages.module.css"
import { baseUrl } from "../../../../../../settings/BaseUrl";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import _ from "lodash";
import useLocalStorage from "../../../../../../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, } from "@fortawesome/free-solid-svg-icons"
import MarkAsRead from "./MarkAsRead";
import DeleteMessageButton from "./DeleteMessageButton";

export default function ContactMessages() {

    const [auth, setAuth] = useLocalStorage("jwt", null)
    const [contactMessages, setContactMessages] = useState([]);
    const [messageContainerOpen, setMessageContainerOpen] = useState(false);
    const [id, setId] = useState("");
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
                    setContactMessages(_.reverse(json.data))
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchContactMessages()

    }, [contactMessages])

    function onListClick(event) {
        setId(event.target.dataset.id)
        setName(event.target.dataset.name)
        setSubject(event.target.dataset.subject)
        setEmail(event.target.dataset.email)
        setMessage(event.target.dataset.message)
        setCreated(event.target.dataset.created)
        MarkAsRead(event.target.dataset.id, auth)
        setMessageContainerOpen(true)

    }

    function toggleMessageContainerVisual() {
        setMessageContainerOpen(false)
    }

    return (
        <>
            {contactMessages.map(function (messages) {

                return (
                    <ul key={messages.id} className={`${messages.attributes.new_contact_message ? styles.newMessageUlContainer : styles.ulContainer} ${messageContainerOpen ? styles.hide : styles.show}`} onClick={onListClick} data-id={messages.id} data-name={messages.attributes.name} data-subject={messages.attributes.subject} data-message={messages.attributes.message} data-email={messages.attributes.email} data-created={messages.attributes.createdAt}>
                        <li className={styles.li}>
                            <p className={styles.from}>From: <span>{messages.attributes.name}</span></p>
                            <p className={styles.subject}>Subject: <span>{messages.attributes.subject}</span></p>
                            <p className={styles.date}>{DateTime.fromISO(messages.attributes.createdAt).toFormat('DD')}</p>
                        </li>
                    </ul>
                )
            })}
            <div className={`${styles.messageContainer} ${!messageContainerOpen ? styles.hide : styles.show}`}>
                <FontAwesomeIcon className={styles.messageGoBackButton} onClick={toggleMessageContainerVisual} icon={faAngleLeft} />
                <hr />
                <div className={styles.messageBody}>
                    <div className={styles.messageFromAndDateContainer}>
                        <p className={styles.messageFrom}><span>From:</span> {name}</p>
                        <div className={styles.messageDateAndMenuIconContainer}>
                            <p>{!created ? "" : DateTime.fromISO(created).toFormat('DD')}</p>
                            <DeleteMessageButton className={styles.messageMenuIcon} id={id} auth={auth} />
                        </div>
                    </div>
                    <p className={styles.messageSubject}><span>Subject:</span> {subject}</p>
                    <p className={styles.messageMessage}>{message}</p>
                    <p className={styles.messageEmail}><span>Email:</span> {email}</p>
                </div>
            </div>
        </>
    )
}