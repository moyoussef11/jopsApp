import { Link } from "react-router-dom";
import hero from "../assets/images/hero.png";
import Cookies from "universal-cookie";
const Home = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  return (
    <div className="px-10 md:px-16 lg:px-60 py-20 flex justify-between items-center flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start justify-center gap-5 font-semibold">
        <h3 className="font-bold capitalize text-3xl">
          jops<span className="text-orange-500">App</span>
        </h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
        </p>
        {token ? (
          <Link
            to="/dashboard"
            className="bg-orange-500 capitalize text-white p-2 rounded hover:bg-orange-200 hover:text-orange-500 duration-200"
          >
            dashboard
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-orange-500 capitalize text-white p-2 rounded hover:bg-orange-200 hover:text-orange-500 duration-200"
          >
            login
          </Link>
        )}
      </div>
      <div className="w-full sm:w-1/2">
        <img src={hero} alt="heroImg" />
      </div>
    </div>
  );
};

export default Home;
