import styles from "./AuthNavbar.module.css"
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import ContactForm from "../ContactForm/ContactForm";
import Inbox from "./Inbox/Inbox";
export default function AuthNavbar() {

    const [contactVisual, setContactVisual] = useState(false);

    function toggleContactModal() {
        if (contactVisual === false) {
            setContactVisual(true)
        } else {
            setContactVisual(false)
        }
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}><Link to="/">Holidaze</Link></div>
            <ul>
                <li>
                    <DropdownMenu />
                </li>
                <li>
                    <Inbox />
                </li>
                <li>
                    <NavLink to="/accommodations">Accommodations</NavLink>
                </li>
                <li>
                    <p className={styles.contactButton} onClick={toggleContactModal}>Contact</p>
                    <div className={contactVisual ? styles.show : styles.hide}>
                        <ContactForm />
                    </div>
                </li>
                <li>
                    <NavLink to="/">About</NavLink>
                </li>
            </ul>
        </nav>
    )
} 