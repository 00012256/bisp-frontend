import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const Register = () => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confpassword: "",
  });
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const storage = getStorage();

  const onUpload = async (element: File) => {
    setLoading(true);

    if (element.type === "image/jpeg" || element.type === "image/png") {
      try {
        const filename = `${Date.now()}_${element.name}`;
        const fileRef = ref(storage, filename);
        await uploadBytes(fileRef, element);

        const downloadURL = await getDownloadURL(fileRef);

        setFile(downloadURL);

        setLoading(false);
      } catch (error) {
        console.error("Error uploading file to Firebase Storage:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error("Please action an image in jpeg or png format");
    }
  };

  const formSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (loading) return;

      const formElement = e.target as HTMLFormElement;
      const fileInput = formElement.elements.namedItem(
        "profile-pic"
      ) as HTMLInputElement;

      const { firstName, lastName, email, password, confpassword } =
        formDetails;
      if (!firstName || !lastName || !email || !password || !confpassword) {
        return toast.error("Input field should not be empty");
      } else if (firstName.length < 3) {
        return toast.error("First name must be at least 3 characters long");
      } else if (lastName.length < 3) {
        return toast.error("Last name must be at least 3 characters long");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }

      if (fileInput) {
        const actionedFile = fileInput.files?.[0];
        if (actionedFile) {
          await onUpload(actionedFile);
        }
      }

      await toast.promise(
        axios.post("/users/register", {
          firstName,
          lastName,
          email,
          password,
          pic: file,
        }),
        {
          success: "User registered successfully",
          error: "Unable to register user",
          loading: "Registering user...",
        }
      );

      return navigate("/login");
    } catch (error) {
      return toast.error("An error happened while registering user");
    }
  };

  return (
    <section className='register-section flex-center'>
      <div className='register-container flex-center'>
        <h2 className='form-heading'>Sign Up</h2>
        <form onSubmit={formSubmit} className='register-form'>
          <input
            type='text'
            name='firstName'
            className='form-input'
            placeholder='Enter your first name'
            value={formDetails.firstName}
            onChange={inputChange}
          />
          <input
            type='text'
            name='lastName'
            className='form-input'
            placeholder='Enter your last name'
            value={formDetails.lastName}
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
          <input
            type='file'
            name='profile-pic'
            id='profile-pic'
            className='form-input'
          />
          <input
            type='password'
            name='password'
            className='form-input'
            placeholder='Enter your password'
            value={formDetails.password}
            onChange={inputChange}
          />
          <input
            type='password'
            name='confpassword'
            className='form-input'
            placeholder='Confirm your password'
            value={formDetails.confpassword}
            onChange={inputChange}
          />
          <button
            type='submit'
            className='btn form-btn'
            disabled={loading ? true : false}
          >
            sign up
          </button>
        </form>
        <p>
          Already a user?{" "}
          <NavLink className='login-link' to={"/login"}>
            Log in
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default Register;
