import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import "../styles/user.css";
import Doctor from "../interfaces/Doctor";
import { getData, putData } from "../api/api";
import { RootState } from "../redux/store";

const AdminApplications = () => {
  const [applications, setApplications] = useState<Doctor[] | []>([]);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.root.loading);

  const getAllApplications = async () => {
    try {
      dispatch(setLoading(true));
      const temp: Doctor[] = await getData(`/doctors/pending-doctors`);
      setApplications(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  const acceptDoctorApplication = async (id: any) => {
    try {
      const confirm = window.confirm("Are you sure you want to accept?");
      if (confirm) {
        await toast.promise(putData(`/doctors/accept/${id}`), {
          success: "Application accepted",
          error: "Error accepting application",
          loading: "Accepting application...",
        });
        getAllApplications();
      }
    } catch (error) {
      return error;
    }
  };

  const rejectDoctorApplication = async (id: any) => {
    try {
      const confirm = window.confirm("Are you sure you want to reject?");
      if (confirm) {
        await toast.promise(putData(`/doctors/reject/${id}`), {
          success: "Application rejected",
          error: "Error rejecting application",
          loading: "Rejecting application...",
        });
        getAllApplications();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAllApplications();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className='user-section'>
          <h3 className='home-sub-heading'>All Applications</h3>
          {applications.length > 0 ? (
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          <img
                            className='user-table-pic'
                            src={
                              ele?.id?.pic ||
                              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                            }
                            alt={ele?.id?.firstName}
                          />
                        </td>
                        <td>{ele?.id?.firstName}</td>
                        <td>{ele?.id?.lastName}</td>
                        <td>{ele?.id?.email}</td>
                        <td>{ele?.id?.mobile}</td>
                        <td>{ele?.experience}</td>
                        <td>{ele?.specialty}</td>
                        <td>{ele?.fee}</td>
                        <td className='action'>
                          <button
                            className='btn user-btn accept-btn'
                            onClick={() => {
                              acceptDoctorApplication(ele?.id?._id);
                            }}
                          >
                            Accept
                          </button>
                          <button
                            className='btn user-btn reject-btn'
                            onClick={() => {
                              rejectDoctorApplication(ele?.id?._id);
                            }}
                          >
                            Reject
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

export default AdminApplications;
