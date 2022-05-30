import styles from "./AuthNavbar.module.css"
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import ContactForm from "../ContactForm";
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
        <>
            <nav className={styles.nav}>
                <div className={styles.logo}><Link to="/">Holidaze</Link></div>
                <ul>
                    <li>
                        <DropdownMenu />
                    </li>
                    <li>
                        <Inbox />
                    </li>
                </ul>
            </nav>
        </>
    )
} 