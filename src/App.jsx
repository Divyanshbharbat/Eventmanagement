import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import AllEvents from "./pages/AllEvents";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PaymentPage from "./PaymentPage";
import EventRegistration from "./pages/EventRegistration";

function App() {
  return (
    <Router>
    
      <Navbar />
      <div className="pt-20">
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/all-events" element={<AllEvents />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<Login/>}/>
                  <Route path="/event/:uid" element={<EventRegistration />} />
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
