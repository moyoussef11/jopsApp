import axios from "axios";
import { createContext, useState } from "react";
import Cookies from "universal-cookie";

export const JopContext = createContext();

function JopProvider({ children }) {
  const [jops, setJops] = useState([]);
  const cookies = new Cookies();
  // Get All Jop
  async function getData() {
    try {
      const token = await cookies.get("token");
      const res = await axios.get("http://localhost:1010/api/jops", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setJops(res.data.jops);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <JopContext.Provider value={{ jops, getData }}>
      {children}
    </JopContext.Provider>
  );
}

export default JopProvider;
