import React, { useState } from 'react';
import { FiMenu } from "react-icons/fi"
import { Link, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";

const NavbarJobVacancy = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="border-b border-gray-300 bg-white py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between xl:max-w-7xl mx-auto max-w-full px-[5%] flex-wrap w-full">
        <Link reloadDocument to="/"> <img
            src="/logonice.png"
            alt="Logo"
            className="h-8 w-48"
          /> </Link>

          <FiMenu className="lg:hidden block h-6 w-6 cursor-pointer" onClick={() => setOpen(!open)} />

          <nav className={`${open ? "block" : "hidden"} w-full lg:flex items-center lg:w-auto`}>
            <ul className="text-base font-sans text-gray-600 lg:flex lg:justify-between">
              <li>
                <Link reloadDocument
                  to="/"
                  className={`lg:px-5 py-2 block hover:text-[#21A753] font-sans font-semibold ${location.pathname === '/' ? 'text-[#21A753]' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link reloadDocument
                  to="/job-vacancy"
                  className={`lg:px-5 py-2 block hover:text-[#21A753] font-sans font-semibold ${location.pathname === '/job-vacancy' ? 'text-[#21A753]' : ''}`}
                >
                  Lowongan
                </Link>
              </li>
              <li>
                {!Cookies.get("token") && (
                  <Link reloadDocument
                    to="/register"
                    className="lg:px-5 py-2 block hover:text-[#21A753] font-sans font-semibold"
                  >
                    Register
                  </Link>
                )}
              </li>
              <li>
                {!Cookies.get("token") && (
                  <Link reloadDocument
                    to="/login"
                    className="px-6 py-2 block bg-[#21A753] text-white font-sans rounded-lg"
                  >
                    Login
                  </Link>
                )}
              </li>
              <li>
                {Cookies.get("token") && (
                  <Link reloadDocument
                    to="/dashboard"
                    className={`lg:px-5 py-2 block hover:text-[#21A753] font-semibold ${location.pathname.startsWith('/dashboard/list-job-vacancy') ? 'text-[#21A753]' : ''}`}
                  >
                    Dashboard
                  </Link>
                )}
              </li>
              <li>
                {Cookies.get("token") && (
                  <a
                    className="px-6 py-2 block bg-[#21A753] text-white rounded-lg hover:opacity-80"
                    href="/"
                    onClick={() => {
                      Cookies.remove("token");
                      Cookies.remove("name");
                      Cookies.remove("email");
                      Cookies.remove("image_url");
                    }}
                  >
                    Logout
                  </a>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavbarJobVacancy;