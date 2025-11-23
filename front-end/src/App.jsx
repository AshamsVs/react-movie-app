import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Favorite from "./pages/fav";
import { MovieProvider } from "./context/moviecontext.jsx";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favorite />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
