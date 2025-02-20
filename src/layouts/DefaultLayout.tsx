import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "");
      localStorage.setItem("data-theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="w-screen h-screen flex flex-col bg-background text-on-background overflow-x-hidden"
      dir="rtl"
    >
      <header className="bg-primary text-on-primary p-4 fixed top-0 w-full h-16 shadow-md flex justify-between items-center">
        <span className="text-xl font-bold">ابزار سفارش‌گذاری درصدی</span>
        <button
          className="p-2 rounded-full bg-secondary"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-primary" />
          )}
        </button>
      </header>
      <main className="flex-1 p-6 pt-20 w-full max-w-screen overflow-x-hidden">
        <div className="bg-primary-container p-4 rounded-lg shadow-md h-full w-full overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>  
  );
}

export default DefaultLayout;
