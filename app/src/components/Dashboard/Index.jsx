import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { JopContext } from "../../context/jopProvider";

const Index = () => {
  const { jops, getData } = useContext(JopContext);
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <h3 className=" text-center capitalize font-semibold">
        welcome to jops<span className="text-orange-500">App </span>dashboard
      </h3>
      <div className="py-10 flex items-center justify-between gap-5 flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 bg-gray-100 p-5 text-center rounded flex flex-col gap-3 capitalize shadow-2xl">
          <h4 className="font-bold border-b-2 w-fit mx-auto pb-1 border-orange-500">
            jops
          </h4>
          <span className="sm:text-4xl">{jops.length}</span>
          <Link
            className="bg-orange-500 text-white p-2 rounded hover:bg-orange-200 hover:text-orange-500 duration-200 cursor-pointer"
            to="jops"
          >
            show jops
          </Link>
        </div>
        <div className="w-full sm:w-1/2 bg-gray-100 p-5 text-center rounded flex flex-col gap-3 capitalize shadow-2xl">
          <h4 className="font-bold border-b-2 w-fit mx-auto pb-1 border-orange-500">
            users
          </h4>
          <span className="sm:text-4xl">3434</span>
          <Link
            className="bg-orange-500 text-white p-2 rounded hover:bg-orange-200 hover:text-orange-500 duration-200 cursor-pointer"
            to="jops"
          >
            show users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
