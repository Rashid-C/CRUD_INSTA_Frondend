import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Navbar />
      <main
        className={`transition-opacity duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>


      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/20 to-pink-900/20 animate-gradient" />
    </div>
  );
};

export default Layout;
