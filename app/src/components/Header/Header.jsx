import { memo, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const CookiesUni = new Cookies();
  const [cookies, removeCookie] = useCookies();
  const [user, setUser] = useState({
    token: '',
    name: '',
    email: '',
  });
  const nav = useNavigate();
  useEffect(() => {
    setUser({
      token: cookies.token,
      name: cookies.name,
      email: cookies.email,
    });
  }, [cookies]);
  // Handle logout
  async function logout() {
    await removeCookie("token");
    await removeCookie("name");
    await removeCookie("email");
    await CookiesUni.remove("token");
    await CookiesUni.remove("name");
    await CookiesUni.remove("email");
    await setUser({
      token: null,
      name: null,
      email: null,
    });
    nav('/login');
  }

  const { token, name, email } = user;

  return (
    <header className="px-10 lg:px-60 flex justify-between items-center py-5 relative">
      <div>
        <Link to="/">
          <h1 className="capitalize font-bold text-2xl md:text-4xl">
            jops<span className="text-orange-500">App</span>
          </h1>
        </Link>
      </div>
      {token ? (
        <div className="hidden sm:block">
          <ul className="flex justify-between items-center gap-5 md:gap-10 capitalize font-semibold">
            <li>
              <p>hello, {name}</p>
              <span className="text-sm text-gray-400">{email}</span>
            </li>
            <li
              onClick={() => logout()}
              className="bg-orange-500 text-white p-2 rounded hover:bg-orange-200 hover:text-orange-500 duration-200 cursor-pointer"
            >
              logout
            </li>
          </ul>
        </div>
      ) : (
        <Link to="register" className="hidden sm:block">
          <button className="bg-orange-500 text-white p-2 rounded hover:bg-orange-200 hover:text-orange-500 duration-200 cursor-pointer">
            register
          </button>
        </Link>
      )}
      {toggle ? (
        <div className="absolute w-full left-0 top-16 bg-slate-200 p-5 z-10">
          {token ? (
            <ul className="flex flex-col justify-between items-center gap-5 md:gap-10 capitalize font-semibold">
              <li>
                <p>hello, {name}</p>
                <span className="text-sm text-gray-400">{email}</span>
              </li>
              <li className="bg-orange-500 text-white p-2 rounded hover:bg-orange-200 hover:text-orange-500 duration-200 cursor-pointer">
                logout
              </li>
            </ul>
          ) : (
            <Link to="register" className="">
              <button className="bg-orange-500 text-white p-2 rounded hover:bg-orange-200 hover:text-orange-500 duration-200 cursor-pointer">
                register
              </button>
            </Link>
          )}
        </div>
      ) : (
        ""
      )}
      <div
        onClick={() => setToggle(!toggle)}
        className="cursor-pointer sm:hidden"
      >
        {!toggle ? (
          <FaBars
            size={25}
            className="text-orange-500 hover:text-orange-200 duration-200"
          />
        ) : (
          <IoIosCloseCircle
            size={25}
            className="text-orange-500 hover:text-orange-200 duration-200"
          />
        )}
      </div>
    </header>
  );
};

export default memo(Header);
