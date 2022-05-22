
/*

  const [searchNameValue, setSearchNameValue] = useState("");
  const [hotelCheckbox, setHotelCheckbox] = useState("");
  const [bAndBCheckbox, setBAndBCheckbox] = useState("");
  const [guestHousesCheckbox, setGuestHousesCheckbox] = useState("");

  console.log(hotelCheckbox);
  console.log(bAndBCheckbox);
  console.log(guestHousesCheckbox);

  function handleSearchName(event) {

    setSearchNameValue(event.target.value.toLowerCase())
    console.log(searchNameValue);
  }

  function handleHotelCheck(event) {

    setHotelCheckbox("Hotel")

    if (event.target.checked === false) {
      setHotelCheckbox("")
    }
  }

  function handleBAndBCheck(event) {
    setBAndBCheckbox("Bed_and_breakfast")

    if (event.target.checked === false) {
      setBAndBCheckbox("")
    }
  }

  function handleGuestHousesCheck(event) {
    setGuestHousesCheckbox("Guest_house")

    if (event.target.checked === false) {
      setGuestHousesCheckbox("")
    }
  }



<div className={styles.filterNameConatiner}>
<label htmlFor="search-name">Search by name</label>
<input onChange={handleSearchName} id="search-name" type="text" placeholder="Search" />
</div>

<div>
<p>Type of staying</p>
<div>
  <input onChange={handleHotelCheck} id="hotel" type="checkbox" />
  <label htmlFor="hotel">Hotel</label>
</div>
<div>
  <input onChange={handleBAndBCheck} id="b&bs" type="checkbox" />
  <label htmlFor="b&s">B&Bs</label>
</div>
<div>
  <input onChange={handleGuestHousesCheck} id="guesthouses" type="checkbox" />
  <label htmlFor="guesthouses">Guesthouses</label>
</div>
</div>*/