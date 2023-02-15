import React, { useReducer } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:7000/users");
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (email) => {
    fetch(`http://localhost:7000/users/admin/${email}`, {
      method: "PUT",
      headers:{
        authorization:`bearer ${localStorage.getItem('accessToken ')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make admin successful");
          refetch();
        }
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold my-5">All Users</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr className="hover" key={i}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user?.role !== "Admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user.email)}
                      className="btn btn-xs btn-primary "
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-xs btn-secondary ">Delate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
