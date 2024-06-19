import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadContent from "../../components/Loader/LoadContent";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { role, isRoleLoading } = useRole();

  const {
    data: allUsers,
    isLoading: allUsersLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", role._id],
    queryFn: async () => {
      const response = await axiosSecure.get("/admin/all-users");
      console.log(response?.data?.data);
      return response?.data?.data;
    },
  });

  const { mutateAsync: makeAdmin, isLoading: mutationLoading } = useMutation({
    mutationFn: async (userId) => {
      const response = await axiosSecure.patch(`/admin/change-role/${userId}`);
      return response.data;
    },
    onSuccess: () => {
      refetch();
      toast.success("User Role Updated Successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong! Please try again.");
    },
  });

  const handleMakeAdmin = async (userId) => {
    await makeAdmin(userId);
  };

  if (allUsersLoading || isRoleLoading || mutationLoading) {
    return <LoadContent />;
  }

  return (
    <div className="w-[95%] lg:max-w-screen-lg mx-auto mb-8">
      <div className="mt-8">
        <div className="text-xl font-mulish text-center font-semibold mb-4">
          Manage Users
        </div>

        <p className="text-xl text-center font-semibold text-slate-400 mt-4">
          {allUsers?.length === 0 ? "No Comments Found" : ""}
        </p>

        {allUsers?.length !== 0 && (
          <div className="mx-auto overflow-auto lg:overflow-visible">
            <table className="w-full text-center mt-8">
              <thead>
                <tr className="border-b-2">
                  <th className="px-4 py-2">User Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Make Admin</th>
                  <th className="px-4 py-2">Subscription Status</th>
                </tr>
              </thead>

              <tbody>
                {allUsers?.length !== 0 &&
                  allUsers?.map(
                    (user) =>
                      user._id !== role._id && (
                        <tr key={user._id} className="border-b-2">
                          <td className="px-4 py-2 text-left">{user.name}</td>
                          <td className="px-4 py-2  text-left">{user.email}</td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => handleMakeAdmin(user._id)}
                              disabled={user.role === "admin"}
                              className="px-5 py-1 bg-blue-500 text-white rounded disabled:cursor-not-allowed disabled:bg-opacity-50"
                            >
                              {user.role === "admin"
                                ? "Already an Admin"
                                : "Make Admin"}
                            </button>
                          </td>
                          <td className="px-4 py-2 capitalize">{user.role}</td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
