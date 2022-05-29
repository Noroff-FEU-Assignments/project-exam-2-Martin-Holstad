import styles from "./EnquirysButton.module.css"
import { baseUrl } from "../../../../../settings/BaseUrl";
import { useState, useEffect } from "react";
import useLocalStorage from "../../../../../hooks/useLocalStorage";

export default function EnquirysButton({ updateApi, enquirysMessagesVisual }) {

    const [auth, setAuth] = useLocalStorage("jwt", null)
    const [enquirys, setEnquirys] = useState([]);

    useEffect(function () {

        async function fetchEnquirys() {

            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`
                }
            };

            try {

                const response = await fetch(baseUrl + "/api/enquiries", options)

                if (response.ok) {
                    const json = await response.json()
                    setEnquirys(json.data)
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchEnquirys()

    }, [updateApi])

    const newEnquirysMessageLength = enquirys.filter((trueLength) => trueLength.attributes.new_enquiry_message).length;

    return (
        <div className={styles.enquirysButtonContainer}>
            <p className={enquirysMessagesVisual ? styles.enquirysButtonFocus : styles.enquirysButton}>Enquirys </p>
            <div className={`${styles.newEnquirysLength} ${newEnquirysMessageLength === 0 ? styles.hide : styles.show}`}>{newEnquirysMessageLength}</div>
        </div>
    )
}