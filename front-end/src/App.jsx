import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Fav from "./pages/fav.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Fav />} />
      </Routes>
    </>
  );
}

export default App;
