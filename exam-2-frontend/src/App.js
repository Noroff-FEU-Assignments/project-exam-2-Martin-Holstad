import "./css/global.css"
import styles from "./App.module.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home"
import { Navbar } from "./components/common/Navbar/Navbar";
import Accommodations from "./components/Accommodations/Accommodations";
import AccommodationDetails from "./components/AccommodationDetails/AccommodationDetails";
import Reservation from "./components/Reservation/Reservation"
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Footer from "./components/common/Footer/Footer";
import About from "./components/About/About";


function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Router>
          <header>
            <Navbar />
          </header>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/accommodations" element={<Accommodations />}></Route>
            <Route path="/accommodations" element={<Accommodations />}></Route>
            <Route path="/accommodation-details/:id" element={<AccommodationDetails />}></Route>
            <Route path="/reservation/:id" element={<Reservation />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route exact path="/admin-panel" element={<AdminPanel />}></Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;