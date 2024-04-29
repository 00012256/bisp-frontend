import React, { useState } from "react";
import "../styles/contact.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { postData } from "../api/api";
import User from "../interfaces/User";
import { jwtDecode } from "jwt-decode";

interface FormDetails {
  specialty: string;
  experience: string;
  fees: string;
}

const ApplyDoctor = () => {
  const { userId } = jwtDecode<User>(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState<FormDetails>({
    specialty: "",
    experience: "",
    fees: "",
  });

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const btnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await toast.promise(
        postData(`/doctors/apply/${userId}`, {
          formDetails,
        }),
        {
          success: "Doctor application sent successfully",
          error: "Unable to send Doctor application",
          loading: "Sending doctor application...",
        }
      );

      navigate("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      <section
        className='register-section flex-center apply-doctor'
        id='contact'
      >
        <div className='register-container flex-center contact'>
          <h2 className='form-heading'>Apply for Doctor</h2>
          <form className='register-form '>
            <input
              type='text'
              name='specialty'
              className='form-input'
              placeholder='Enter your specialty'
              value={formDetails.specialty}
              onChange={inputChange}
            />
            <input
              type='number'
              name='experience'
              className='form-input'
              placeholder='Enter your experience (in years)'
              value={formDetails.experience}
              onChange={inputChange}
            />
            <input
              type='number'
              name='fees'
              className='form-input'
              placeholder='Enter your fees  (in dollars)'
              value={formDetails.fees}
              onChange={inputChange}
            />
            <button type='submit' className='btn form-btn' onClick={btnClick}>
              apply
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyDoctor;
