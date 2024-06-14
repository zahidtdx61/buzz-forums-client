import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="w-full flex">
      <div className="w-[20%] min-h-screen">
        <Sidebar />
      </div>
      <div className="w-[80%] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
