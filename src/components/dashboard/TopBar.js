import { Fragment } from "react";
import {
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon, UserIcon,
} from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import React from "react";
import Cookies from "js-cookie";

export default function TopBar({ showNav, setShowNav }) {
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("name");
    Cookies.remove("email");
    Cookies.remove("image_url");
  };

  return (
    <div
      className={`fixed bg-[#2F323E] w-full h-16 flex justify-between items-center transition-all duration-[400ms] z-10 ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3Icon
          className="h-8 w-8 text-white cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>

      <div className="flex items-center pr-4 md:pr-16">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <picture>
                <img
                  src={Cookies.get("image_url")}
                  className="rounded-full h-8 md:mr-4 border-2 border-white shadow-sm"
                  alt="profile picture"
                />
              </picture>
              <span className="hidden md:block font-medium text-white">
                {Cookies.get("name")}
              </span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-white" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-md">
              <div className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/dashboard/profile"
                      className={`${
                        active ? "bg-[#21a753] text-white" : "text-gray-700"
                      } flex hover:pacity-70 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center`}
                    >
                      <UserIcon className="h-4 w-4 mr-2" />
                      Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="/"
                      onClick={handleLogout}
                      className={`${
                        active ? "bg-[#21a753] text-white" : "text-gray-700"
                      } flex hover:opacity-70 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center`}
                    >
                      <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2" />
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}