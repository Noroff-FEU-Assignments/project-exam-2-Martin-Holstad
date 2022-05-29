import { baseUrl } from "../../../../../../settings/BaseUrl";

export default async function MarkEnquiryAsRead(id, auth) {

    const options = {
        method: "PUT",
        body: JSON.stringify({ data: { new_enquiry_message: false } }),
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