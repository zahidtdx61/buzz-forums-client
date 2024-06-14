import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="w-full flex h-full">
      <div className="w-[20%] min-h-full">
        <Sidebar />
      </div>
      <div className="w-[80%] min-h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
