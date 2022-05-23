import styles from "./ReservationForm.module.css"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useLocalStorage from "../../../hooks/useLocalStorage";
import React, { useState } from "react";
import { baseUrl } from "../../../settings/BaseUrl";
import DisplayMessage from "../../common/DisplayMessage/DisplayMessage";
import ButtonLoader from "../../common/Loaders/ButtonLoader";


export default function ReservationForm({ accommodation }) {

    const [totalPrice, setTotalPrice] = useLocalStorage("total", null)
    const [checkinDate, setCheckinDate] = useLocalStorage("checkinDate", null)
    const [checkOutDate, setCheckOutDate] = useLocalStorage("checkOutDate", null)
    const [message, setMessage] = useState(null);
    const [btnLoader, setBtnLoader] = useState(false);

    const schema = yup.object().shape({
        name: yup.string().required("Please enter your name"),
        email: yup.string().required("Please enter your email address").matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Not valid email address"),
        phone: yup.number().required("Please enter your phone number"),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),

    });

    async function onSubmit(data) {

        setBtnLoader(true)

        const url = baseUrl + "/api/enquiries"

        const options = {
            method: "POST",
            body: JSON.stringify({ data }),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {

            const response = await fetch(url, options)

            if (response.ok) {
                setMessage(<DisplayMessage messageType="success" >Reservation request sendt</DisplayMessage>)
            }

        } catch (error) {
            console.log(error);
            setMessage(<DisplayMessage messageType="error" >Oops! something went wrong</DisplayMessage>)
        } finally {
            setBtnLoader(false)
        }
    }

    function handleKeyPress() {
        setMessage(null)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <p className={styles.header}>Contact information</p>

            <div>{message}</div>

            <label htmlFor="name">Name</label>
            {errors.name && <span className={styles.errors}>{errors.name.message}</span>}
            <input onKeyPress={handleKeyPress} {...register("name")} placeholder="Name" />

            <label htmlFor="email">Email</label>
            {errors.email && <span className={styles.errors}>{errors.email.message}</span>}
            <input onKeyPress={handleKeyPress} {...register("email")} placeholder="Email" />

            <label htmlFor="phone">Phone</label>
            {errors.phone && <span className={styles.errors}>{errors.phone.message}</span>}
            <input onKeyPress={handleKeyPress} {...register("phone")} placeholder="Phone" />

            <input {...register("total")} value={totalPrice} />
            <input {...register("checkin")} value={checkinDate} />
            <input {...register("checkout")} value={checkOutDate} />

            <button>{btnLoader ? <ButtonLoader /> : "Ask for reservation"}</button>
        </form>
    )
}