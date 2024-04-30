import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/notification.css";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import "../styles/user.css";
import Notification from "../interfaces/Notification";
import { getData } from "../api/api";
import { RootState } from "../redux/store";

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.root.loading);
  const userInfo = useSelector((state: RootState) => state.root.userInfo);

  const getAllNotifications = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await getData<Notification[]>(
        `/notifications/${userInfo?._id}`
      );
      dispatch(setLoading(false));
      setNotifications(temp);
    } catch (error) {}
  };

  useEffect(() => {
    userInfo && getAllNotifications();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className='container notif-section'>
          <h2 className='page-heading'>Your Notifications</h2>

          {notifications.length > 0 ? (
            <div className='notifications'>
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Content</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>{ele?.content}</td>
                        <td>{ele?.updatedAt?.split("T")[0]}</td>
                        <td>{ele?.updatedAt?.split("T")[1].split(".")[0]}</td>
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

export default Notifications;
