import styles from "./DropdownMenu.module.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faArrowRightFromBracket, faPlus } from "@fortawesome/free-solid-svg-icons"

export default function DropdownMenu() {

    const history = useNavigate()

    const [user, setUser] = useLocalStorage("user", null)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleDropdownMenu() {
        if (isMenuOpen === false) {
            setIsMenuOpen(true)
        } else {
            setIsMenuOpen(false)
        }
    }

    function handleLogout() {
        localStorage.clear("user");
        localStorage.clear("jwt");
        history("/")
        window.location.reload()
    }

    return (
        <>
            <div className={styles.dropdownButton} onClick={toggleDropdownMenu}>
                <p>{user.username}</p>
                <FontAwesomeIcon className={styles.dropDownIcon} icon={faAngleDown} />
            </div>
            <div className={`${styles.dropDownMenu} ${!isMenuOpen ? styles.hide : styles.show}`}>
                <div className={styles.menuItems}>
                    <FontAwesomeIcon icon={faPlus} />
                    <p>Add staying</p>
                </div>
                <hr />
                <div className={styles.menuItems} onClick={handleLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    <p>Logout</p>
                </div>
            </div>
        </>
    )
}