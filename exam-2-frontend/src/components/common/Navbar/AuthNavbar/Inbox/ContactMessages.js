import styles from "./ContactMessages.module.css"
import { baseUrl } from "../../../../../settings/BaseUrl";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import useLocalStorage from "../../../../../hooks/useLocalStorage";

export default function ContactMessages() {

    const [auth, setAuth] = useLocalStorage("jwt", null)
    const [contactMessages, setContactMessages] = useState([]);

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

    function asdas(data) {
        console.log(data.target.getAttribute(``));

    }

    return (
        <>
            {contactMessages.map(function (messages) {

                return (
                    <ul className={styles.ul} key={messages.id} onClick={asdas}>
                        <li className={styles.li}>
                            <p className={styles.from}>From: <span className={styles.fromName}>{messages.attributes.name}</span></p>
                            <p className={styles.subject}>Subject: <span className={styles.subjectName}>{messages.attributes.subject}</span></p>
                            <p className={styles.time}>{DateTime.fromISO(messages.attributes.createdAt).toFormat('hh : mm')}</p>
                        </li>
                    </ul>
                )
            })}
        </>
    )
}