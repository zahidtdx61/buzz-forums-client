import { Outlet, useNavigation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import Sidebar from "../../components/Sidebar/Sidebar";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Dashboard = () => {
  const navigation = useNavigation();
  const { isLoading } = useAuth();
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <Loader />;

  // console.log(role);

  if (navigation.state === "loading") return <Loader />;
  if (isLoading) return <Loader />;

  return (
    <div className="w-full flex flex-col lg:flex-row h-full">
      <div className="w-full lg:w-[20%] lg:min-h-full">
        {role?.role === "admin" && <AdminSidebar />}
        {role?.role === "user" && <Sidebar />}
      </div>
      <div className="w-full lg:w-[80%] lg:min-h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
