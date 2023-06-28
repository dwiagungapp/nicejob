import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    let navigate = useNavigate()
  const [input, setInput] = useState({
    name: "",
    image_url: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleRegist = (e) => {
    e.preventDefault();

    let { name, image_url, email, password } = input;
    axios
      .post("https://dev-example.sanbercloud.com/api/register ", {
        name,
        image_url,
        email,
        password,
      })
      .then((res) => {
        alert("Akun berhasil dibuat");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        alert("Registrasi gagal");
      });
    setInput({
      name: "",
      image_url: "",
      email: "",
      password: "",
    });
  };
  
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
    <h3 className="text-2xl font-bold text-center">Join us</h3>
    <form onSubmit={handleRegist} method="POST">
      <div className="mt-4">
        <div>
          <label className="block" htmlFor="Name">
            Name
          </label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Name"
            name="name"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#21A753]"
          />
        </div>
        <div className="mt-4">
          <label className="block" htmlFor="email">
            Foto Profile
          </label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="URL Image"
            name="image_url"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#21A753]"
          />
        </div>
        <div className="mt-4">
          <label className="block">Email</label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Email"
            name="email"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#21A753]"
          />
        </div>
        <div className="mt-4">
          <label className="block">Password</label>
          <input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#21A753]"
          />
        </div>
        <div className="flex">
          <button className="w-full px-6 py-2 mt-4 text-white bg-[#21A753] rounded-lg hover:bg-green-300">
            Create Account
          </button>
        </div>
        <div className="mt-6 text-grey-dark">
          Already have an account?
          <a className="text-[#21A753] hover:underline" href="/login">
            Log in
          </a>
        </div>
      </div>
    </form>
  </div>
</div>
    </>
  );
};
export default Register;