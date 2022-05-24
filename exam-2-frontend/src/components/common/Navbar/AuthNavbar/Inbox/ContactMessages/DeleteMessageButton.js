import styles from "./DeleteMessageButton.module.css"
import { baseUrl } from "../../../../../../settings/BaseUrl";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"


export default function DeleteMessageButton({ id, auth }) {

    async function deleteMessage() {

        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }
        };

        try {

            const response = await fetch(baseUrl + "/api/contact-messages/" + id, options)
            const json = await response.json()
            console.log(json);
        } catch (error) {
            console.log(error);
        }
    }


    function handleDeleteButton() {

        const doDelete = window.confirm("Do you want to delete this message?")

        if (doDelete) {
            deleteMessage()
        }
    }


    return (
        <div>
            <FontAwesomeIcon className={styles.deleteButton} onClick={handleDeleteButton} icon={faTrash} />
        </div>
    )
}