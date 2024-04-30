import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import User from "../interfaces/User";
import { deleteData, getData } from "../api/api";
import { RootState } from "../redux/store";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.root.loading);

  const getAllUsers = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await getData<User[]>(`/users`);
      setUsers(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  const deleteUser = async (userId: string) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await toast.promise(deleteData(`/users/${userId}`), {
          success: "User deleted successfully",
          error: "Unable to delete user",
          loading: "Deleting user...",
        });
        getAllUsers();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className='user-section'>
          <h3 className='home-sub-heading'>All Users</h3>
          {users.length > 0 ? (
            <div className='user-container'>
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Pic</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile No.</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Is Doctor</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          <img
                            className='user-table-pic'
                            src={ele?.pic}
                            alt={ele?.firstName}
                          />
                        </td>
                        <td>{ele?.firstName}</td>
                        <td>{ele?.lastName}</td>
                        <td>{ele?.email}</td>
                        <td>{ele?.mobile}</td>
                        <td>{ele?.age}</td>
                        <td>{ele?.gender}</td>
                        <td>{ele?.isDoctor ? "Yes" : "No"}</td>
                        <td className='action'>
                          <button
                            className='btn user-btn'
                            onClick={() => {
                              deleteUser(ele?._id);
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
    </>
  );
};

export default Users;
