import { Outlet, useNavigation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
  const navigation = useNavigation();
  const { isLoading } = useAuth();

  if (navigation.state === "loading") return <Loader />;
  if (isLoading) return <Loader />;

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
