import styles from "./AdminPanel.module.css"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../settings/BaseUrl"
import useLocalStorage from "../../hooks/useLocalStorage"
import { useEffect, useState } from "react";
import DisplayMessage from "../common/DisplayMessage/DisplayMessage"
import ComponentLoader from "../common/Loaders/ComponentLoader";


export default function AdminPanel() {

    const [auth, setAuth] = useLocalStorage("jwt", null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(false);
    const [mainImage, setMainImage] = useState(false);
    const [images, setImages] = useState(false);
    const schema = yup.object().shape({
        name: yup.string().required("Pleas enter name"),
        address: yup.string().required("Pleas enter adress"),
        price: yup.number().typeError("Please enter price"),
        description: yup.string().required("Please enter description"),
        rating: yup.number().typeError("Please enter rating").max(10, 'Max value 10.'),
        staying: yup.string().typeError("Please select type of staying"),
        featured: yup.string().typeError("please select if featured or not"),
        roomName: yup.string().required("Pleas enter room name"),
        guests: yup.number().typeError("Please enter number of guests"),
        beds: yup.number().typeError("Please enter number of beds"),
        kitchens: yup.number().typeError("Please enter number of kitchens"),
        bathrooms: yup.number().typeError("Please enter number of bathrooms"),
        main_image: yup.mixed().required("Please add main image"),
        images: yup.mixed().required("Please add sub images"),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),

    });

    async function onSubmit(data) {


        if (!mainImage) {
            return alert("Need to add images");
        }

        if (images.length === 0 || images === false) {
            return alert("Need to add images");
        }

        setLoading(true)
        const url = baseUrl + "/api/hotels?populate=*"

        const formData = new FormData()

        formData.append("files.main_image", mainImage)

        for (let i = 0; i < images.length; i++) {
            formData.append("files.images", images[i]);
        }

        formData.append("data", JSON.stringify({ name: data.name, address: data.address, price: data.price, description: data.description, rating: data.rating, hotel_type: data.staying, featured_hotel: data.featured, room_name: data.roomName, guests: data.guests, beds: data.beds, kitchens: data.kitchens, bathrooms: data.bathrooms }))

        const options = {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${auth}`,
            }
        }

        try {
            const response = await fetch(url, options)

            if (response.ok) {
                setMessage(<DisplayMessage messageType="success">Staying created!</DisplayMessage>)
            }

            if (!response.ok) {
                setMessage(<DisplayMessage messageType="error">Oops! Something went wrong...</DisplayMessage>)
                reset()
            }

        } catch (error) {
            setMessage(<DisplayMessage messageType="error">Oops! Something went wrong...</DisplayMessage>)
            console.log(error);

        } finally {
            setLoading(false)
        }
    }


    if (loading) {
        return <div className={styles.loaderContainer}><ComponentLoader /></div>
    }

    function handleMainImage(event) {
        setMainImage(event.target.files[0])
    }

    function handleImages(event) {

        setImages(event.target.files)
    }


    return (
        <main className={styles.main}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                <h1 className={styles.h1}>Add new staying</h1>
                <hr className={styles.hr} />
                <div>{message}</div>
                <div className={styles.steponeHeaderContainer}>
                    <p>Step 1 - Staying information</p>
                </div>

                <div className={styles.steponeInputContainer}>

                    <div>
                        <label htmlFor="name">Name</label>
                        {errors.name && <span className={styles.errors}>{errors.name.message}</span>}
                        <input {...register("name")} type="text" placeholder="Name" />

                        <label htmlFor="address">Address</label>
                        {errors.address && <span className={styles.errors}>{errors.address.message}</span>}
                        <input {...register("address")} type="text" placeholder="Address" />

                        <label htmlFor="price">Price NOK / night</label>
                        {errors.price && <span className={styles.errors}>{errors.price.message}</span>}
                        <input {...register("price")} type="number" placeholder="Price" />

                        <label htmlFor="description">Description</label>
                        {errors.description && <span className={styles.errors}>{errors.description.message}</span>}
                        <textarea {...register("description")} type="text" placeholder="Description" />
                    </div>
                    <div>

                        <label htmlFor="rating">Rating</label>
                        {errors.rating && <span className={styles.errors}>{errors.rating.message}</span>}
                        <input {...register("rating")} type="number" placeholder="Rating" step="any" />

                        <label htmlFor="staying">Type of staying</label>
                        {errors.staying && <span className={styles.errors}>{errors.staying.message}</span>}
                        <select {...register("staying")} >
                            <option value="hotel">Hotel</option>
                            <option value="bed_and_breakfast">Bed and breakfast</option>
                            <option value="guest_house">Guesthouse</option>
                        </select>

                        <label htmlFor="featured">Featured staying</label>
                        {errors.featured && <span className={styles.errors}>{errors.featured.message}</span>}
                        <select {...register("featured")} >
                            <option value={false}>Not featured</option>
                            <option value={true}>Featured</option>
                        </select>

                    </div>
                </div>

                <div className={styles.stepTwoHeaderContainer}>
                    <p>Step 2 - Room information</p>
                </div>

                <div className={styles.stepTwoInputContainer}>
                    <div>
                        <label htmlFor="roomName">Enter room name / short description</label>
                        {errors.roomName && <span className={styles.errors}>{errors.roomName.message}</span>}
                        <input {...register("roomName")} type="text" placeholder="Room name / short description" />

                        <label htmlFor="guests">Maximum Guests</label>
                        {errors.guests && <span className={styles.errors}>{errors.guests.message}</span>}
                        <input {...register("guests")} type="number" placeholder="Guests" />

                        <label htmlFor="beds">Number of beds</label>
                        {errors.beds && <span className={styles.errors}>{errors.beds.message}</span>}
                        <input {...register("beds")} type="number" placeholder="Beds" />
                    </div>
                    <div>
                        <label htmlFor="kitchens">Number of kitchens</label>
                        {errors.kitchens && <span className={styles.errors}>{errors.kitchens.message}</span>}
                        <input {...register("kitchens")} type="number" placeholder="Kitchens" />

                        <label htmlFor="bathrooms">Number of bathrooms</label>
                        {errors.bathrooms && <span className={styles.errors}>{errors.bathrooms.message}</span>}
                        <input {...register("bathrooms")} type="number" placeholder="Bathrooms" />
                    </div>
                </div>


                <div className={styles.stepThreeHeaderContainer}>
                    <p>Step 3 - Staying Images</p>
                </div>

                <div className={styles.stepThreeInputContainer}>
                    <div>
                        <label htmlFor="main_image">Main image</label>
                        {errors.main_image && <span className={styles.errors}>{errors.main_image.message}</span>}
                        <input className={styles.mainImageInput} {...register("main_image")} type="file" onChange={handleMainImage} />

                    </div>
                    <div>
                        <label htmlFor="images">Sub images</label>
                        {errors.images && <span className={styles.errors}>{errors.images.message}</span>}
                        <input className={styles.subImagesInput} {...register("images")} type="file" multiple="multiple" onChange={handleImages} />
                    </div>
                </div>

                <button>Create</button>
            </form>
        </main>
    )
}