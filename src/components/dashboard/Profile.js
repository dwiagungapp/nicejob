import React from "react";
import Cookies from "js-cookie";

export default function Profile() {
  return (
    <>
    <div className="pt-10 md:col-span-2">
    <h1 className="font-bold text-dark text-3xl mb-5 max-w-md lg:text-3xl">
      {" "}
      Data Profile
    </h1></div>
      <div className="flex flex-col bg-white min-w-0 break-words w-full mb-6 shadow-md pt-10 rounded-lg border-2 border-gray-50 mt-6">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="flex">
                <img
                  alt="..."
                  src={Cookies.get("image_url")}
                  className="shadow-xl w-[300px] inline-block align-middle rounded-full "
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400">
              <span className="text-l block font-bold tracking-wide ">
                Nama Lengkap :
              </span>
              {Cookies.get("name")}
            </div>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400">
              <span className="text-l font-bold block tracking-wide ">
                Email :
              </span>
              {Cookies.get("email")}
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <a
                href="/dashboard/profile/change-password"
                className="text-base font-semibold text-white bg-[#21a753] py-3 px-8 rounded-full hover:shadow-lg hover:opacity-70 transition duration-300 ease-in-out"
              >
                Change Password
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-10"></div>
    </>
  );
}