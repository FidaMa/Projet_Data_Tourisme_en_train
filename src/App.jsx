import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./i18n";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartePACA from "./pages/CartePACA";
import Trajets from "./pages/Trajets";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carte" element={<CartePACA />} />
          <Route path="/trajets" element={<Trajets />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
