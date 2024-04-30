import { useState } from "react";
import "../styles/contact.css";

interface FormDetails {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [formDetails, setFormDetails] = useState<FormDetails>({
    name: "",
    email: "",
    message: "",
  });

  const inputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <section className='register-section flex-center' id='contact'>
      <div className='contact-container flex-center contact'>
        <h2 className='form-heading'>Contact Us</h2>
        <form className='register-form'>
          <input
            type='text'
            name='name'
            className='form-input'
            placeholder='Enter your name'
            value={formDetails.name}
            onChange={inputChange}
          />
          <input
            type='email'
            name='email'
            className='form-input'
            placeholder='Enter your email'
            value={formDetails.email}
            onChange={inputChange}
          />
          <textarea
            name='message'
            className='form-input'
            placeholder='Enter your message'
            value={formDetails.message}
            onChange={inputChange}
            rows={8}
            cols={12}
          ></textarea>

          <button className='btn form-btn' onClick={onClick}>
            send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
