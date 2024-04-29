import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import { jwtDecode } from "jwt-decode";
import User from "../interfaces/User";
import { getData, postData } from "../api/api";

const Login = () => {
  const dispatch = useDispatch();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { email, password } = formDetails;
      if (!email || !password) {
        return toast.error("Input field should not be empty");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      }

      const data = await toast.promise(
        postData<{ token: string }>("/users/login", {
          email,
          password,
        }),
        {
          success: "Login successfully",
          error: "Unable to login user",
          loading: "Logging user...",
        }
      );
      localStorage.setItem("token", data.token);
      const userInfo = jwtDecode<User>(data.token);
      getUser(userInfo.userId);
    } catch (error) {
      return error;
    }
  };

  const getUser = async (id: string) => {
    try {
      const user = await getData<User>(`/users/${id}`);
      dispatch(setUserInfo(user));
      return navigate("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <section className='register-section flex-center'>
      <div className='register-container flex-center'>
        <h2 className='form-heading'>Log In</h2>
        <form onSubmit={formSubmit} className='register-form'>
          <input
            type='email'
            name='email'
            className='form-input'
            placeholder='Enter your email'
            value={formDetails.email}
            onChange={inputChange}
          />
          <input
            type='password'
            name='password'
            className='form-input'
            placeholder='Enter your password'
            value={formDetails.password}
            onChange={inputChange}
          />
          <button type='submit' className='btn form-btn'>
            Log in
          </button>
        </form>
        <p>
          Not a user?{" "}
          <NavLink className='login-link' to={"/register"}>
            Register
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default Login;
