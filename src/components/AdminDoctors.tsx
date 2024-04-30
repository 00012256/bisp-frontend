import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import "../styles/user.css";
import Doctor from "../interfaces/Doctor";
import { deleteData, getData } from "../api/api";
import { RootState } from "../redux/store";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.root.loading);

  const getAllDoctors = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await getData<Doctor[]>(`/doctors`);
      setDoctors(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  const deleteDoctor = async (userId: any) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await toast.promise(deleteData(`/doctors/${userId}`), {
          success: "Doctor deleted successfully",
          error: "Unable to delete Doctor",
          loading: "Deleting Doctor...",
        });
        getAllDoctors();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className='user-section'>
          <h3 className='home-sub-heading'>All Doctors</h3>
          {doctors.length > 0 ? (
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
                    <th>Experience</th>
                    <th>Specialization</th>
                    <th>Fee</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors?.map((doctor, i) => {
                    return (
                      <tr key={doctor?._id}>
                        <td>{i + 1}</td>
                        <td>
                          <img
                            className='user-table-pic'
                            src={doctor?.id?.pic}
                            alt={doctor?.id?.firstName}
                          />
                        </td>
                        <td>{doctor?.id?.firstName}</td>
                        <td>{doctor?.id?.lastName}</td>
                        <td>{doctor?.id?.email}</td>
                        <td>{doctor?.id?.mobile}</td>
                        <td>{doctor?.experience}</td>
                        <td>{doctor?.specialty}</td>
                        <td>{doctor?.fee}</td>
                        <td className='action'>
                          <button
                            className='btn user-btn'
                            onClick={() => {
                              deleteDoctor(doctor?.id?._id);
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

export default AdminDoctors;
