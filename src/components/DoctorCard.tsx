import "../styles/doctorcard.css";
import { useState } from "react";
import BookAppointment from "../components/BookAppointment";
import { toast } from "react-hot-toast";
import Doctor from "../interfaces/Doctor";

interface IProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<IProps> = ({ doctor }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    if (localStorage.getItem("token") === "") {
      return toast.error("You must log in first");
    }
    setModalOpen(true);
  };

  return (
    <div className={`card`}>
      <div className={`card-img flex-center`}>
        <img src={doctor?.id?.pic} alt='profile' />
      </div>
      <h3 className='card-name'>
        Dr. {doctor?.id?.firstName + " " + doctor?.id?.lastName}
      </h3>
      <p className='specialization'>
        <strong>Specialization: </strong>
        {doctor?.specialty}
      </p>
      <p className='experience'>
        <strong>Experience: </strong>
        {doctor?.experience}yrs
      </p>
      <p className='fee'>
        <strong>Fee per consultation: </strong>$ {doctor?.fee}
      </p>
      <p className='phone'>
        <strong>Phone: </strong>
        {doctor?.id?.mobile}
      </p>
      <button className='btn appointment-btn' onClick={handleModal}>
        Book Appointment
      </button>
      {modalOpen && (
        <BookAppointment setModalOpen={setModalOpen} doctor={doctor} />
      )}
    </div>
  );
};

export default DoctorCard;
