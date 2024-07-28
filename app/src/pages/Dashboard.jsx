import Index from "../components/Dashboard/Index";
import SideBar from "../components/Dashboard/SideBar";
import { Outlet, useOutlet } from "react-router-dom";

const Dashboard = () => {
  const outlet = useOutlet();

  return (
    <div className="px-10 md:px-16 lg:px-60 flex">
      <div className="w-1/4">
        <SideBar />
      </div>
      <div className="w-full p-2">{outlet ? <Outlet /> : <Index />}</div>
    </div>
  );
};

export default Dashboard;
