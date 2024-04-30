import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import "../styles/doctorapply.css";
import { postData } from "../api/api";

const ApplyForDoctor = (id: string) => {
  const [formDetails, setFormDetails] = useState({
    specialty: "",
    experience: "",
    fee: "",
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { specialty, experience, fee } = formDetails;

      if (!specialty || !experience || !fee) {
        return toast.error("Input field should not be empty");
      }
      await toast.promise(
        postData(`/doctors/apply/${id}`, {
          specialty,
          experience,
          fee,
        }),
        {
          loading: "Submitting application...",
          success: "Thank You for submitting the apllication.",
          error: "Unable to submit application",
        }
      );
    } catch (error) {
      return error;
    }
  };

  return (
    <section className='apply-doctor-section flex-center'>
      <div className='apply-doctor-container flex-center'>
        <h2 className='form-heading'>Apply For Doctor</h2>
        <form onSubmit={formSubmit} className='register-form'>
          <input
            type='text'
            name='specialty'
            className='form-input'
            placeholder='Enter your specialty'
            value={formDetails.specialty}
            onChange={onInputChange}
          />
          <input
            type='text'
            name='experience'
            className='form-input'
            placeholder='Enter your experience in years'
            value={formDetails.experience}
            onChange={onInputChange}
          />
          <input
            type='text'
            name='fee'
            className='form-input'
            placeholder='Enter your fee per consultation in dollars'
            value={formDetails.fee}
            onChange={onInputChange}
          />
          <button type='submit' className='btn form-btn'>
            apply
          </button>
        </form>
      </div>
    </section>
  );
};

export default ApplyForDoctor;
