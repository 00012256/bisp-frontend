import { useState } from "react";
import "../styles/bookappointment.css";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { postData } from "../api/api";
import Doctor from "../interfaces/Doctor";
import { useSelector } from "react-redux";
import User from "../interfaces/User";
import { RootState } from "../redux/store";

interface FormDetails {
  date: string;
  time: string;
}

const BookAppointment = ({
  setModalOpen,
  doctor,
}: {
  setModalOpen: (open: boolean) => void;
  doctor: Doctor;
}) => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    date: "",
    time: "",
  });

  console.log(doctor);

  const userInfo = useSelector(
    (state: RootState) => state.root.userInfo
  ) as User;

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const book = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (doctor?.id?._id === userInfo?._id) {
        toast.error("You cannot book an appointment with yourself");
      } else if (formDetails.date === "" || formDetails.time === "") {
        return toast.error("Input field should not be empty");
      } else {
        await toast.promise(
          postData("/appointments/book", {
            doctorId: doctor?.id,
            userId: userInfo?._id,
            date: formDetails.date,
            time: formDetails.time,
            doctorName: doctor?.id?.firstName,
            doctorSurname: doctor?.id?.lastName,
            userName: userInfo.firstName,
            userSurname: userInfo.lastName,
          }),
          {
            success: "Appointment booked successfully",
            error: "Unable to book appointment",
            loading: "Booking appointment...",
          }
        );
      }
      setModalOpen(false);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div className='modal flex-center'>
        <div className='modal__content'>
          <h2 className='page-heading'>Book Appointment</h2>
          <IoMdClose
            onClick={() => {
              setModalOpen(false);
            }}
            className='close-btn'
          />
          <div className='register-container flex-center book'>
            <form className='register-form'>
              <input
                type='date'
                name='date'
                className='form-input'
                value={formDetails.date}
                onChange={inputChange}
              />
              <input
                type='time'
                name='time'
                className='form-input'
                value={formDetails.time}
                onChange={inputChange}
              />
              <button type='submit' className='btn form-btn' onClick={book}>
                book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
