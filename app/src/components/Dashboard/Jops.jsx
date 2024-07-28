import { memo, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { JopContext } from "../../context/jopProvider";
import axios from "axios";
import Cookies from "universal-cookie";

const Jops = () => {
  const { jops, getData } = useContext(JopContext);
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    getData();
  }, [token]);

  async function deleteJop(id) {
    await axios.delete(`http://localhost:1010/api/jops/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    getData();
  }

  // render Ui
  const showData = jops.map((jop) => (
    <div
      key={jop._id}
      className="relative p-2 bg-gray-100 capitalize flex flex-col items-center sm:items-start justify-between gap-2 shadow-xl"
    >
      <span className="absolute right-1 top-1 p-1 bg-orange-200 text-orange-500 text-sm rounded">
        {jop.createdAt.split("T")[0]}
      </span>
      <h6 className="md:text-2xl font-bold">{jop.position}</h6>
      <span className="w-fit p-1 bg-orange-200 text-orange-500 text-sm font-bold rounded">
        {jop.company}
      </span>
      <div className="flex items-center gap-5">
        <Link to={`/dashboard/jops/edit/${jop._id}`}>
          <button className="capitalize bg-green-500 text-white p-2 rounded hover:bg-green-200 hover:text-green-500 duration-200 cursor-pointer">
            edit
          </button>
        </Link>
        <button
          onClick={() => deleteJop(jop._id)}
          className="capitalize bg-red-500 text-white p-2 rounded hover:bg-red-200 hover:text-red-500 duration-200 cursor-pointer"
        >
          delete
        </button>
      </div>
      <span className="absolute right-1 bottom-1 p-1 font-semibold bg-orange-200 text-orange-500 text-sm rounded">
        {jop.status}
      </span>
    </div>
  ));

  return (
    <div>
      <Link to="/dashboard/addjop">
        <button className="mb-2 capitalize bg-green-500 text-white p-2 rounded hover:bg-green-200 hover:text-green-500 duration-200 cursor-pointer">
          new jop
        </button>
      </Link>
      <div className="grid sm:grid-cols-2 gap-5">
        {jops.length === 0 ? "loading" : showData}
      </div>
    </div>
  );
};

export default memo(Jops);
