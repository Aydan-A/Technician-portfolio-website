import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

export default function Layout({ theme, onThemeChange }) {
  return (
    <div className="min-h-screen overflow-hidden bg-page text-ink">
      <Navbar onThemeChange={onThemeChange} theme={theme} />
      <Outlet context={{ theme }} />
      <Footer />
    </div>
  );
}
