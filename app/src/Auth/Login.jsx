import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const nav = useNavigate();

  // Handle form
  async function submit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1010/api/auth/login", {
        email: email,
        password: password,
      });
      const token = res.data.token;
      const userName = res.data.user.name;
      const userEmail = res.data.user.email;
      cookies.set("token", token);
      cookies.set("name", userName);
      cookies.set("email", userEmail);
      nav("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex items-center justify-center py-24">
      <div className="px-6 bg-slate-100 py-10 w-full md:w-1/3 flex flex-col gap-5 shadow-lg">
        <h4 className="capitalize text-3xl font-semibold text-center">login</h4>
        <form onSubmit={submit} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-1 capitalize">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="Enter your Email"
              className="rounded p-2 outline-none focus:outline-orange-500 placeholder:text-sm text-orange-500"
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 capitalize">
            <label htmlFor="password">Password:</label>
            <input
              placeholder="Enter your Password"
              className="rounded p-2 outline-none focus:outline-orange-500 placeholder:text-sm text-orange-500"
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-orange-500 capitalize text-white p-2 rounded hover:bg-orange-200 hover:text-orange-500 duration-200"
            type="submit"
          >
            login
          </button>
          <p className="capitalize font-semibold text-sm text-center">
            not a member yet ?{" "}
            <Link className="text-orange-500" to="/register">
              register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
