import React from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
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
          {/* Sidebar content here */}
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
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
