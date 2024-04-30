import { FaHome, FaList, FaUserMd, FaUsers, FaEnvelope } from "react-icons/fa";
import "../styles/sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";

const SidePanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebar = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: <FaUsers />,
    },
    {
      name: "Doctors",
      path: "/dashboard/doctors",
      icon: <FaUserMd />,
    },
    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: <FaList />,
    },
    {
      name: "Applications",
      path: "/dashboard/applications",
      icon: <FaEnvelope />,
    },
  ];

  const logoutFunc = () => {
    dispatch(setUserInfo(null));
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <section className='sidebar-section flex-center'>
        <div className='sidebar-container'>
          <ul>
            {sidebar.map((ele, i) => {
              return (
                <li key={i}>
                  {ele.icon}
                  <NavLink to={ele.path}>{ele.name}</NavLink>
                </li>
              );
            })}
          </ul>
          <div className='logout-container'>
            <MdLogout />
            <p onClick={logoutFunc}>Logout</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SidePanel;
