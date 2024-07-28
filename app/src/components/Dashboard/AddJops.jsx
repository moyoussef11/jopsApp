import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AddJops = () => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const nav = useNavigate();



  const submit = async (e) => {
    e.preventDefault();
    try {
       await axios.post(
        "http://localhost:1010/api/jops",
        {
          company,
          position,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      nav("/dashboard/jops");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-6 bg-slate-100 py-10 w-full md:w-1/2 flex flex-col mx-auto sm:mt-20 gap-5 shadow-lg">
      <h4 className="capitalize text-3xl font-semibold text-center">new jop</h4>
      <form onSubmit={submit} className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-1 capitalize">
          <label htmlFor="company">company:</label>
          <input
            placeholder="Enter your company name"
            className="rounded p-2 outline-none focus:outline-orange-500 placeholder:text-sm text-orange-500"
            type="text"
            name="company"
            id="company"
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 capitalize">
          <label htmlFor="position">position:</label>
          <input
            placeholder="Enter your position"
            className="rounded p-2 outline-none focus:outline-orange-500 placeholder:text-sm text-orange-500"
            type="text"
            name="position"
            id="position"
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <button
          className="bg-orange-500 capitalize text-white p-2 rounded hover:bg-orange-200 hover:text-orange-500 duration-200"
          type="submit"
        >
          add
        </button>
      </form>
    </div>
  );
};

export default AddJops;
