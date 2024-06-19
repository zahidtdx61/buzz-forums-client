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
    <div className="w-full flex h-full">
      <div className="w-[20%] min-h-full">
        {role?.role === "admin" && <AdminSidebar />}
        {role?.role === "user" && <Sidebar />}
      </div>
      <div className="w-[80%] min-h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
