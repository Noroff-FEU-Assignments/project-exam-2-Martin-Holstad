import { baseUrl } from "../../../../../../settings/BaseUrl";

export default async function MarkAsRead(id, auth) {

    const options = {
        method: "PUT",
        body: JSON.stringify({ data: { new_contact_message: false } }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`
        }
    };

    try {

        const response = await fetch(baseUrl + "/api/contact-messages/" + id, options)

    } catch (error) {
        console.log(error);
    }
}