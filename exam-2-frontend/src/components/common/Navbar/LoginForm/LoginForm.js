import styles from "./LoginForm.module.css"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import useLocalStorage from "../../../../hooks/useLocalStorage";
import DisplayMessage from "../../DisplayMessage/DisplayMessage";
import { baseUrl } from "../../../../settings/BaseUrl";
import ButtonLoader from "../../Loaders/ButtonLoader";

export default function LoginForm() {

    const history = useNavigate()

    const [auth, setAuth] = useLocalStorage("jwt", null)
    const [user, setUser] = useLocalStorage("user", null)
    const [message, setMessage] = useState(null);
    const [btnLoader, setBtnLoader] = useState(false);


    const schema = yup.object().shape({
        email: yup.string().required("Please enter your email address").matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Not valid email address"),
        password: yup.string().required("Please enter your passowrd"),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),

    });

    async function onSubmit(data) {

        const url = baseUrl + "/api/auth/local"

        const options = {
            method: "POST",
            body: JSON.stringify({ identifier: data.email, password: data.password }),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {

            const response = await fetch(url, options)
            const json = await response.json()

            setBtnLoader(true)

            if (json.jwt) {
                setAuth(json.jwt)
                setUser(json.user)
                history("/")
                window.location.reload()
            }

            if (json.error) {
                setMessage(<DisplayMessage messageType="warning" >Invalid email or password</DisplayMessage>)
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

                <h1 className={styles.h1}>Login</h1>

                <div>{message}</div>

                <label htmlFor="email">Email</label>
                {errors.email && <span className={styles.errors}>{errors.email.message}</span>}
                <input onKeyPress={handleKeyPress} {...register("email")} placeholder="Email" />

                <label htmlFor="password">Password</label>
                {errors.password && <span className={styles.errors}>{errors.password.message}</span>}
                <input onKeyPress={handleKeyPress} {...register("password")} type="password" placeholder="Password" />
                <button>{btnLoader ? <ButtonLoader /> : "Login"}</button>
            </form>
        </div>
    )
}