import styles from "./ContactMessagesButton.module.css"
import { baseUrl } from "../../../../../settings/BaseUrl";
import { useState, useEffect } from "react";
import useLocalStorage from "../../../../../hooks/useLocalStorage";

export default function ContactMessagesButton({ updateApi, contactMessagesVisual }) {

    const [auth, setAuth] = useLocalStorage("jwt", null)
    const [messages, setMessages] = useState([]);

    useEffect(function () {

        async function fetchMessages() {

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
                    setMessages(json.data)

                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages()

    }, [updateApi])

    const newContactMessageLength = messages.filter((trueLength) => trueLength.attributes.new_contact_message).length;

    return (
        <div className={styles.contactButtonContainer}>
            <p className={!contactMessagesVisual ? styles.contactButton : styles.contactButtonFocus}>Contact</p>
            <div className={`${styles.newContactLength} ${newContactMessageLength === 0 ? styles.hide : styles.show}`}>{newContactMessageLength}</div>
        </div>
    )
}