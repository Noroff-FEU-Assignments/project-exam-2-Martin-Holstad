import styles from "./DeleteEnquiryButton.module.css"
import { baseUrl } from "../../../../../../settings/BaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"


export default function DeleteEnquiryButton({ id, auth, toggleEnquiryContainerVisual }) {

    async function deleteMessage() {

        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth}`
            }
        };

        try {

            const response = await fetch(baseUrl + "/api/enquiries/" + id, options)

        } catch (error) {
            console.log(error);
        }
    }


    function handleDeleteButton() {

        const doDelete = window.confirm("Do you want to delete this message?")

        if (doDelete) {
            deleteMessage()
            toggleEnquiryContainerVisual()
        }
    }


    return (
        <div>
            <FontAwesomeIcon className={styles.deleteButton} onClick={handleDeleteButton} icon={faTrash} />
        </div>
    )
}