import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    let navigate = useNavigate()
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let { email, password } = input;
    axios
      .post("https://dev-example.sanbercloud.com/api/login", {
        email,
        password,
      })
      .then((res) => {
        let { data } = res;
        Cookies.set("token", data.token, { expires: 1 });
        Cookies.set("name", data.user.name, { expires: 1 });
        Cookies.set("email", data.user.email, { expires: 1 });
        Cookies.set("image_url", data.user.image_url, { expires: 1 });

        // Cookies.set("user", JSON.stringify(data.user), { expires: 1 });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        alert("Login gagal");
      });
    setInput({
      email: "",
      password: "",
    });
  };
  return (
    <>
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
    <h3 className="text-2xl font-bold text-center">Login</h3>
    <form onSubmit={handleLogin} method="POST">
      <div className="mt-4">
        <div>
          <label className="block" htmlFor="Email">
            Email
          </label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Email"
            name="email"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#21A753]"
          />
        </div>
        <div className="mt-4">
          <label className="block" htmlFor="email">
            Password
          </label>
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
            Login
          </button>
        </div>
        <div className="mt-6 text-grey-dark">
          Not have an account?
          <a className="ml-2 text-[#21A753] hover:underline" href="/register">
            Register
          </a>
        </div>
      </div>
    </form>
  </div>
</div>
    </>
  );
};
export default Login;