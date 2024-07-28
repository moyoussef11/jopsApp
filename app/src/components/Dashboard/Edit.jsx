import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

const Edit = () => {
  const { id } = useParams();
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const nav = useNavigate();


  
  const getJop = async () => {
    try {
      const res = await axios.get(`http://localhost:1010/api/jops/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCompany(res.data.jop.company);
      setPosition(res.data.jop.position);
      setStatus(res.data.jop.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJop();
  }, []);

  async function submit(e) {
    e.preventDefault();
    try {
       await axios.patch(
        `  http://localhost:1010/api/jops/${id}`,
        {
          company,
          position,
          status,
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
  }

  return (
    <div className="flex items-center justify-center py-24">
      <div className="px-6 bg-slate-100 py-10 w-full md:w-1/2 flex flex-col gap-5 shadow-lg">
        <h4 className="capitalize text-3xl font-semibold text-center">
          update_jop
        </h4>
        <form onSubmit={submit} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-1 capitalize">
            <label htmlFor="company">company:</label>
            <input
              className="rounded p-2 outline-none focus:outline-orange-500 placeholder:text-sm text-orange-500"
              type="text"
              name="company"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>{" "}
          <div className="flex flex-col gap-1 capitalize">
            <label htmlFor="position">position:</label>
            <input
              className="rounded p-2 outline-none focus:outline-orange-500 placeholder:text-sm text-orange-500"
              type="text"
              name="position"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 capitalize">
            <label htmlFor="status">status:</label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              name="status"
              id="status"
            >
              <option value="interview" selected={status === "interview"}>
                interview
              </option>
              <option value="pending" selected={status === "pending"}>
                pending
              </option>
              <option value="declined" selected={status === "declined"}>
                declined
              </option>
            </select>
          </div>
          <button
            className="bg-orange-500 capitalize text-white p-2 rounded hover:bg-orange-200 hover:text-orange-500 duration-200"
            type="submit"
          >
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
