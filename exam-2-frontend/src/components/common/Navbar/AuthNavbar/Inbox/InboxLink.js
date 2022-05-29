import styles from "./InboxLink.module.css"
import { baseUrl } from "../../../../../settings/BaseUrl"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import useLocalStorage from "../../../../../hooks/useLocalStorage"
import { useEffect, useState } from "react"

export default function InboxLink({ updateApi }) {

    const [auth, setAuth] = useLocalStorage("jwt", null)
    const [contactMessages, setContactMessages] = useState([]);
    const [enquirys, setEnquirys] = useState([]);

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

                const json = await response.json()
                setContactMessages(json.data)

            } catch (error) {
                console.log(error);
            }
        }
        fetchContactMessages()
    }, [updateApi])


    useEffect(function () {

        async function fetchEnquirysMessages() {

            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`
                }
            };

            try {

                const response = await fetch(baseUrl + "/api/enquiries", options)

                const json = await response.json()
                setEnquirys(json.data)

            } catch (error) {
                console.log(error);
            }
        }
        fetchEnquirysMessages()
    }, [updateApi])

    const newContactMessageLength = contactMessages.filter((trueLength) => trueLength.attributes.new_contact_message).length;
    const newEnquirysMessageLength = enquirys.filter((trueLength) => trueLength.attributes.new_enquiry_message).length;

    const newMessage = newContactMessageLength + newEnquirysMessageLength

    return (
        <div className={styles.inboxLink}>
            <FontAwesomeIcon className={styles.inboxIcon} icon={faEnvelope} />
            <p>Inbox</p>
            <div className={newMessage === 0 ? styles.hide : styles.newMessagesCount}>{newMessage}</div>
        </div>
    )
}