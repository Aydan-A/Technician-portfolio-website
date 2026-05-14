import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

export default function Layout({ theme, onThemeChange }) {
  return (
    <div className="min-h-screen overflow-hidden bg-stone text-paper">
      <Navbar onThemeChange={onThemeChange} theme={theme} />
      <Outlet />
      <Footer />
    </div>
  );
}
