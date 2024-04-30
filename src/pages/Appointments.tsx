import { useEffect, useState } from "react";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import "../styles/user.css";
import User from "../interfaces/User";
import Appointment from "../interfaces/Appointment";
import { getData, putData } from "../api/api";
import { RootState } from "../redux/store";
import moment from "moment";

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.root.loading);
  const userInfo = useSelector((state: RootState) => state.root.userInfo);

  const getAllAppoint = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await getData<Appointment[]>(
        `/appointments?search=${userInfo?._id}`
      );
      console.log(temp);
      setAppointments(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    getAllAppoint();
  }, []);

  const complete = async (ele: Appointment) => {
    try {
      await toast.promise(putData(`/appointments/${ele._id}/completed`), {
        success: "Appointment completed successfully",
        error: "Unable to complete appointment",
        loading: "Completing appointment...",
      });

      getAllAppoint();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className='container appointments-section'>
          <h2 className='page-heading'>Your Appointments</h2>

          {appointments.length > 0 ? (
            <div className='appointments'>
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                    {userInfo?.isDoctor && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {ele?.doctorId?.firstName +
                            " " +
                            ele?.doctorId?.lastName}
                        </td>
                        <td>
                          {ele?.userId?.firstName + " " + ele?.userId?.lastName}
                        </td>
                        <td>{moment(ele?.date).format("YYYY-MM-DD")}</td>
                        <td>{ele?.time}</td>
                        <td>{ele?.createdAt.split("T")[0]}</td>
                        <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                        <td>{ele?.status}</td>
                        {userInfo?.isDoctor && (
                          <td>
                            {userInfo?._id === ele?.doctorId?._id && (
                              <button
                                className={`btn user-btn accept-btn ${
                                  ele?.status === "completed"
                                    ? "disable-btn"
                                    : ""
                                }`}
                                disabled={ele?.status === "completed"}
                                onClick={() => complete(ele)}
                              >
                                Complete
                              </button>
                            )}
                          </td>
                        )}
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
      <Footer />
    </>
  );
};
export default Appointments;
