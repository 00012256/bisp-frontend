import AdminApplications from "../components/AdminApplications";
import AdminAppointments from "../components/AdminAppointments";
import AdminDoctors from "../components/AdminDoctors";
import SidePanel from "../components/SidePanel";
import Users from "../components/Users";

interface DashboardProps {
  type: "users" | "doctors" | "applications" | "appointments";
}

const Dashboard = (props: DashboardProps) => {
  const { type } = props;
  return (
    <>
      <section className='layout-section'>
        <div className='layout-container'>
          <SidePanel />
          {type === "users" ? (
            <Users />
          ) : type === "doctors" ? (
            <AdminDoctors />
          ) : type === "applications" ? (
            <AdminApplications />
          ) : type === "appointments" ? (
            <AdminAppointments />
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
