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
import DisplayMessage from "../../../../../common/DisplayMessage/DisplayMessage"
import ComponentLoader from "../../../../Loaders/ComponentLoader";

export default function ContactMessages({ setUpdateApi }) {

    const [auth, setAuth] = useLocalStorage("jwt", null);
    const [contactMessages, setContactMessages] = useState([]);
    const [displayMessage, setDisplayMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messageContainerOpen, setMessageContainerOpen] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [created, setCreated] = useState("");
    const [subject, setSubject] = useState("");
    const [update, setUpdate] = useState(false);

    useEffect(function () {

        async function fetchContactMessages() {

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

                const response = await fetch(baseUrl + "/api/contact-messages", options)

                if (response.ok) {
                    const json = await response.json()
                    setContactMessages(_.reverse(json.data))
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
        fetchContactMessages()

    }, [update])

    if (loading) {
        return <div className={styles.loaderContainer}><ComponentLoader /></div>
    }

    function onListClick(event) {
        setId(event.target.dataset.id)
        setName(event.target.dataset.name)
        setSubject(event.target.dataset.subject)
        setEmail(event.target.dataset.email)
        setMessage(event.target.dataset.message)
        setCreated(event.target.dataset.created)
        MarkAsRead(event.target.dataset.id, auth)
        setMessageContainerOpen(true)
        setUpdate(true)
    }

    function toggleMessageContainerVisual() {
        setMessageContainerOpen(false)
        setUpdate(true)
    }

    return (
        <>
            <div>{displayMessage}</div>

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
                    <div className={styles.messageNameAndDateContainer}>
                        <p className={styles.messageName}><span>From:</span> {name}</p>
                        <div className={styles.messageDateAndDeleteIconContainer}>
                            <p>{!created ? "" : DateTime.fromISO(created).toFormat('DD')}</p>
                            <DeleteMessageButton className={styles.deleteMessageButton} id={id} auth={auth} toggleMessageContainerVisual={toggleMessageContainerVisual} />
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