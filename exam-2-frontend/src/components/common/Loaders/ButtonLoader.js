import styles from "./ButtonLoader.module.css"
export default function ButtonLoader() {

    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
        </div>
    )
}