import "./css/global.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home"
import { Navbar } from "./components/common/Navbar/Navbar";
import Accommodations from "./components/Accommodations/Accommodations";
import AccommodationDetails from "./components/AccommodationDetails/AccommodationDetails";
import Reservation from "./components/Reservation/Reservation"

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/accommodations" element={<Accommodations />}></Route>
          <Route path="/accommodation-details/:id" element={<AccommodationDetails />}></Route>
          <Route path="/reservation/:id" element={<Reservation />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;