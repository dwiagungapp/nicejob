import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    current_password: "",
    new_password: "",
    new_confirm_password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleRegist = (e) => {
    e.preventDefault();

    let { current_password, new_password, new_confirm_password } = input;
    axios
      .post(
        "https://dev-example.sanbercloud.com/api/change-password",
        {
          current_password,
          new_password,
          new_confirm_password,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("token") } }
      )
      .then((res) => {
        alert("Password berhasil diubah");
        navigate("/dashboard/profile");
      })
      .catch((error) => {
        console.log(error);
        alert("Password gagal diubah");
      });
    setInput({
      current_password: "",
      new_password: "",
      new_confirm_password: "",
    });
  };

  return (
    <>
      <div class="flex items-center justify-center min-h-screen">
        <div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-2xl md:w-1/3 lg:w-1/2 sm:w-1/3">
          <h3 class="text-2xl font-bold text-center">Change Password</h3>
          <form onSubmit={handleRegist} method="POST">
            <div class="mt-10">
              <div>
                <label class="block" for="Name">
                  Masukkan Password Lama:
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  placeholder="Current password"
                  name="current_password"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                />
              </div>
              <div class="mt-4">
                <label class="block" for="email">
                  Masukkan Password Baru:
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  placeholder="New password"
                  name="new_password"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                />
              </div>
              <div class="mt-4">
                <label class="block">Konfirmasi Password Baru:</label>
                <input
                  onChange={handleChange}
                  type="password"
                  placeholder="Confirm new password"
                  name="new_confirm_password"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                />
              </div>
              <div class="flex">
                <button class="w-full px-6 py-2 mt-4 text-white bg-[#21a753] rounded-lg hover:opacity-70">
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;