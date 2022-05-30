import styles from "./SearchByName.module.css"

export default function SearchByName({ setSearchNameValue }) {

    function handleSearchName(event) {
        setSearchNameValue(event.target.value.toLowerCase())
    }


    return (
        <div className={styles.filterNameConatiner}>
            <label htmlFor="search-name">Search by name</label>
            <input onChange={handleSearchName} id="search-name" type="text" placeholder="Search" />
        </div>
    )
}