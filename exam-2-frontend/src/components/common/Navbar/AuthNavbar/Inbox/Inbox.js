import styles from "./Inbox.module.css"
import React, { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import InboxLink from "./InboxLink";
import ContactMessages from "./ContactMessages/ContactMessages";
import EnquirysMessages from "./EnquirysMessages/EnquirysMessages";
import EnquirysButton from "./EnquirysButton";
import ContactButton from "./ContactMessagesButton";

export default function Inbox() {

    const [inboxVisual, setInboxVisual] = useState(false);
    const [enquirysMessagesVisual, setEnquirysMessagesVisual] = useState(true);
    const [contactMessagesVisual, setContactMessagesVisual] = useState(false);
    const [updateApi, setUpdateApi] = useState(false);


    function toggleInboxVisual() {
        if (inboxVisual === false) {
            setInboxVisual(true)
        } else {
            setInboxVisual(false)
        }
    }

    function toggleEnquirysMessagesVisual() {
        if (enquirysMessagesVisual === false) {
            setContactMessagesVisual(false)
            setEnquirysMessagesVisual(true)
        }
    }

    function toggleContactMessagesVisual() {
        if (contactMessagesVisual === false) {
            setContactMessagesVisual(true)
            setEnquirysMessagesVisual(false)
        }
    }

    return (
        <>
            <div onClick={toggleInboxVisual}>
                <InboxLink updateApi={updateApi} />
            </div>

            <div className={`${styles.inboxContainer} ${!inboxVisual ? styles.hide : styles.show}`}>
                <div className={styles.inbox}>
                    <div className={styles.closeInboxButtonContainer}>
                        <div className={styles.closeInboxButton} onClick={toggleInboxVisual}>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                    </div>
                    <p className={styles.inboxHeader}>Inbox</p>
                    <div className={styles.inboxButtonsContainer}>
                        <div onClick={toggleEnquirysMessagesVisual}>
                            <EnquirysButton updateApi={updateApi} enquirysMessagesVisual={enquirysMessagesVisual} />
                        </div>
                        <div onClick={toggleContactMessagesVisual}>
                            <ContactButton updateApi={updateApi} contactMessagesVisual={contactMessagesVisual} />
                        </div>
                    </div>
                    <hr />
                    <p className={styles.bodyHeader}>{enquirysMessagesVisual ? "Enquiry messages" : "Contact messages"}</p>
                    <div className={styles.inboxBody}>
                        <div className={enquirysMessagesVisual ? styles.show : styles.hide}>
                            <EnquirysMessages setUpdateApi={setUpdateApi} />
                        </div>
                        <div className={contactMessagesVisual ? styles.show : styles.hide} >
                            <ContactMessages setUpdateApi={setUpdateApi} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}