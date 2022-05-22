import styles from "./ContactForm.module.css"
import { baseUrl } from "../../../../settings/BaseUrl";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import DisplayMessage from "../../DisplayMessage/DisplayMessage";
import ButtonLoader from "../../Loaders/ButtonLoader";

export default function ContactForm() {

    const [message, setMessage] = useState(null);
    const [btnLoader, setBtnLoader] = useState(false);

    const schema = yup.object().shape({
        name: yup.string().required("Please enter your name"),
        email: yup.string().required("Please enter your email address").matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Not valid email address"),
        subject: yup.string().required("Please enter your subject"),
        message: yup.string().required("Please enter your message"),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),

    });

    async function onSubmit(data) {

        const url = baseUrl + "/api/contact-messages"

        const options = {
            method: "POST",
            body: JSON.stringify({ data }),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {

            const response = await fetch(url, options)

            setBtnLoader(true)

            if (response.ok) {
                setMessage(<DisplayMessage messageType="success" >Message sendt</DisplayMessage>)
            }

        } catch (error) {
            console.log(error);
            setMessage(<DisplayMessage messageType="error" >Oops! something went wrong</DisplayMessage>)
        } finally {
            setBtnLoader(false)
            reset()
        }
    }

    function handleKeyPress() {
        setMessage(null)
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                <h1 className={styles.h1}>Contact</h1>

                <div>{message}</div>

                <label htmlFor="name">Name</label>
                {errors.name && <span className={styles.errors}>{errors.name.message}</span>}
                <input onKeyPress={handleKeyPress} {...register("name")} placeholder="Name" />

                <label htmlFor="email">Email</label>
                {errors.email && <span className={styles.errors}>{errors.email.message}</span>}
                <input onKeyPress={handleKeyPress} {...register("email")} placeholder="Email" />

                <label htmlFor="subject">Subject</label>
                {errors.subject && <span className={styles.errors}>{errors.subject.message}</span>}
                <input onKeyPress={handleKeyPress} {...register("subject")} placeholder="Subject" />

                <label htmlFor="message">Message</label>
                {errors.message && <span className={styles.errors}>{errors.message.message}</span>}
                <textarea className={styles.textarea} onKeyPress={handleKeyPress} {...register("message")} placeholder="Message" />

                <button>{btnLoader ? <ButtonLoader /> : "Send"}</button>
            </form>
        </div>
    )
}