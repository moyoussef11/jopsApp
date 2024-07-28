import { Link } from "react-router-dom";
import { FiClipboard } from "react-icons/fi";
import { MdOutlineAddToPhotos } from "react-icons/md";

const SideBar = () => {
  return (
    <div className=" w-full min-h-full h-screen bg-orange-500 p-2 rounded">
      <ul className="flex flex-col gap-5">
        <Link to="jops">
          <li className="rounded active flex items-center justify-between cursor-pointer bg-white p-1 capitalize font-semibold hover:bg-orange-200">
            <span className="hidden sm:block">jops</span>
            <FiClipboard className="text-orange-500" />
          </li>
        </Link>
        <Link to="addjop">
          <li className="rounded flex items-center justify-between cursor-pointer bg-white p-1 capitalize font-semibold hover:bg-orange-200">
            <span className="hidden sm:block">add jop</span>
            <MdOutlineAddToPhotos className="text-orange-500" />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default SideBar;
