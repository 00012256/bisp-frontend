import { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/doctors.css";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";
import Doctor from "../interfaces/Doctor";
import { getData } from "../api/api";
import { RootState } from "../redux/store";

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.root.loading);

  const fetchAllDoctors = async () => {
    dispatch(setLoading(true));
    const data = await getData<Doctor[]>(`/doctors`);
    setDoctors(data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && (
        <section className='container doctors'>
          <h2 className='page-heading'>Our Doctors</h2>
          {doctors.length > 0 ? (
            <div className='doctors-card-container'>
              {doctors.map((doctor) => {
                return <DoctorCard doctor={doctor} key={doctor._id} />;
              })}
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

export default Doctors;
