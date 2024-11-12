import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
          <h1 className="text-xl font-bold">Zomato</h1>
          <label
            htmlFor="my-drawer"
            className="btn btn-ghost drawer-button flex items-center gap-2"
            aria-label="open drawer"
          >
            <FaBars className="text-2xl" />
          </label>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-4">
          <li>
            <a
              className="text-lg font-medium hover:bg-primary hover:text-white rounded-lg p-2 transition-colors"
              href="/"
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="text-lg font-medium hover:bg-primary hover:text-white rounded-lg p-2 transition-colors"
              href="/dishes"
            >
              Dishes
            </a>
          </li>
          <li>
            <a
              className="text-lg font-medium hover:bg-primary hover:text-white rounded-lg p-2 transition-colors"
              href="/categories"
            >
              Category
            </a>
          </li>
          <li>
            <a
              className="text-lg font-medium hover:bg-primary hover:text-white rounded-lg p-2 transition-colors"
              href="/modifiers"
            >
              Modifiers
            </a>
          </li>

          <li>
            <a
              className="text-lg font-medium hover:bg-primary hover:text-white rounded-lg p-2 transition-colors"
              href="/orders"
            >
              Orders
            </a>
          </li>

          <li>
            <a
              className="text-lg font-medium hover:bg-primary hover:text-white rounded-lg p-2 transition-colors"
              href="/users"
            >
              Users
            </a>
          </li>
          <li>
            <button
              onClick={handleAuthAction}
              className="text-lg font-medium bg-blue-600 text-white rounded-lg p-2 transition-colors w-full"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
