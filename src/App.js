import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/menu" element={<div>Menu Page</div>} />
            <Route
              path="/reservations"
              element={<div>Reservations Page</div>}
            />
            <Route
              path="/order-online"
              element={<div>Order Online Page</div>}
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
