import styles from "./Footer.module.css"
import { Link } from "react-router-dom"

export default function Footer() {

    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.footerLogo}>
                    <a href="/">
                        <p>Holidaze</p>
                    </a>
                </div>
                <div className={styles.emailContainer}>
                    <p>Copyright 2022</p>
                    <p>Holidaze@gmail.com</p>
                </div>
                <div className={styles.aboutAndContatContainer}>
                    <p >Contact</p>
                    <div className={styles.aboutLink}>
                        <a href="/about">
                            <p>About</p>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}

