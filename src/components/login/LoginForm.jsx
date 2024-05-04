import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import LoginInput from "../../components/inputs/loginInput";

export default function LoginForm({ setOpenRegister }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // initial state for formik
  const loginInfos = {
    email: "",
    password: "",
  };

  const [login, setLogin] = useState(loginInfos);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = login;

  //handling onchange inside form
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  //login validation criterias
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  const loginSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        login
      );
      setError("");
      setLoading(false);
      setSuccess(data.message);
      const { message, ...rest } = data;
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(rest), { expires: 3 });
      navigate("/");
    } catch (error) {
      setSuccess("");
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="/icons/facebook.svg" alt="facebook logo" />
        <span>
          Facebook helps you connect and share with people in your life
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  placeholder="Email address or phone number"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleLoginChange}
                />
                <LoginInput
                  placeholder="Password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>

          <Link to="/reset" className="forgot_password">
            Forgotten password?
          </Link>
          <ClipLoader color="#1876f2" loading={loading} size={30} />
          {error && <div className="error_text">{error}</div>}
          {success && <div className="success_text">{success}</div>}
          <div className="sign_splitter" />
          <button
            className="blue_btn open_signup"
            onClick={() => {
              setOpenRegister(true);
            }}
          >
            Create new account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}
