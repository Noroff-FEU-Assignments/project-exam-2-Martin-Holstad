import styles from "./Navbar.module.css"
import { NavLink, Link } from "react-router-dom";
import React, { useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import ContactForm from "./ContactForm";
import LoginForm from "./LoginForm";
import AuthNavbar from "./AuthNavbar/AuthNavbar";

export function Navbar() {

    const [auth, setAuth] = useLocalStorage("jwt", null)
    const [contactVisual, setContactVisual] = useState(false);
    const [loginVisual, setLoginVisual] = useState(false);

    function toggleContactModal() {
        if (!contactVisual) {
            setContactVisual(true)
        } else {
            setContactVisual(false)
        }
    }

    function toggleLoginModal() {
        if (!loginVisual) {
            setLoginVisual(true)
        } else {
            setLoginVisual(false)
        }
    }

    return (
        <>
            {auth ? (

                <AuthNavbar />

            ) : (

                <nav className={styles.nav}>
                    <div className={styles.logo}><Link to="/">Holidaze</Link></div>
                    <ul>
                        <li>
                            <p className={styles.loginButton} onClick={toggleLoginModal}>Login</p>
                            <div className={loginVisual ? styles.show : styles.hide}>
                                <LoginForm setLoginVisual={setLoginVisual} />
                            </div>
                        </li>
                        <li>
                            <p className={styles.contactButton} onClick={toggleContactModal}>Contact</p>
                            <div className={contactVisual ? styles.show : styles.hide}>
                                <ContactForm setContactVisual={setContactVisual} />
                            </div>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    )
}