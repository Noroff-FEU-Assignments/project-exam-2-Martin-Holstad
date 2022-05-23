import styles from "./Inbox.module.css"
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import ContactMessages from "./ContactMessages/ContactMessages";

export default function Inbox() {

    const [inboxVisual, setInboxVisual] = useState(false);

    function toggleInboxVisual() {
        if (inboxVisual === false) {
            setInboxVisual(true)
        } else {
            setInboxVisual(false)
        }
    }


    return (
        <>
            <div className={styles.inboxLink} onClick={toggleInboxVisual}>
                <FontAwesomeIcon className={styles.inboxIcon} icon={faEnvelope} />
                <p>Inbox</p>
            </div>
            <div className={`${styles.inboxContainer} ${!inboxVisual ? styles.hide : styles.show}`}>
                <div className={styles.inbox}>
                    <p className={styles.inboxHeader}>Your Inbox</p>
                    <div className={styles.inboxButtonsContainer}>
                        <p className={styles.enquirysButton}>Enquirys </p>
                        <p className={styles.contactButton}>Contact</p>
                    </div>
                    <hr />
                    <div className={styles.inboxBody}>
                        <ContactMessages />
                    </div>
                </div>
            </div>
        </>
    )
}