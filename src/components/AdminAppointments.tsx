import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import "../styles/user.css";
import Appointment from "../interfaces/Appointment";
import { getData, putData } from "../api/api";
import { RootState } from "../redux/store";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.root.loading);

  const getAllAppoint = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await getData<Appointment[]>(`/appointments`);
      setAppointments(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    getAllAppoint();
  }, []);

  const complete = async (appointment: Appointment) => {
    try {
      await toast.promise(
        putData(`/appointments/${appointment._id}/completed`),
        {
          success: "Appointment completed successfully",
          error: "Unable to complete appointment",
          loading: "Completing appointment...",
        }
      );

      getAllAppoint();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className='user-section'>
          <h3 className='home-sub-heading'>All Appointments</h3>
          {appointments.length > 0 ? (
            <div className='user-container'>
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

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((appointment, i) => {
                    return (
                      <tr key={appointment?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {appointment?.doctorId?.firstName +
                            " " +
                            appointment?.doctorId?.lastName}
                        </td>
                        <td>
                          {appointment?.userId?.firstName +
                            " " +
                            appointment?.userId?.lastName}
                        </td>
                        <td>{String(appointment?.date)}</td>
                        <td>{appointment?.time}</td>
                        <td>{appointment?.createdAt.split("T")[0]}</td>
                        <td>
                          {appointment?.updatedAt.split("T")[1].split(".")[0]}
                        </td>
                        <td>{appointment?.status}</td>
                        <td>
                          <button
                            className={`btn user-btn accept-btn ${
                              appointment?.status === "completed"
                                ? "disable-btn"
                                : ""
                            }`}
                            disabled={appointment?.status === "completed"}
                            onClick={() => complete(appointment)}
                          >
                            Complete
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

export default AdminAppointments;
