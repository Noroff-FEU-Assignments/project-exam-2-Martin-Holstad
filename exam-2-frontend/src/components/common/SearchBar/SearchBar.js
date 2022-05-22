import { baseUrl } from "../../../settings/BaseUrl";
import { useState, useEffect } from "react";
import { SearchBarUI } from "./SearchBarUI/SearchBarUI";

export default function SearchBar() {

  const [accommodations, setAccommodations] = useState([]);

  useEffect(function () {
    async function fetchAccommodations() {

      try {

        const response = await fetch(baseUrl + "/api/hotels?populate=*")

        if (response.ok) {
          const json = await response.json()
          setAccommodations(json.data)
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchAccommodations()

  }, [])

  return <SearchBarUI accommodations={accommodations} />
}