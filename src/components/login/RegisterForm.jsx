import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import RegisterInput from "../inputs/registerInput";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";

export default function RegisterForm({ setOpenRegister }) {
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dateError, setDateError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [genderError, setGenderError] = useState("");
  const [user, setUser] = useState(userInfos);

  const {
    first_name,
    last_name,
    email,
    password,
    bDay,
    bYear,
    bMonth,
    gender,
  } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What is your First Name ?")
      .min(2, "First name must be between 2 to 16 characters")
      .max(16, "First name must be between 2 to 16 characters")
      .matches(
        /^[aA-zZ\s]+$/,
        "Numbers and Special characters are not allowed"
      ),
    last_name: Yup.string()
      .required("What is your Last Name ?")
      .min(2, "Last name must be between 2 to 16 characters")
      .max(16, "Last name must be between 2 to 16 characters")
      .matches(/^[aA-zZ]+$/, "Numbers and Special characters are not allowed"),

    email: Yup.string()
      .required(
        "You'll need it when logging in and if you ever need to reset your password"
      )
      .email("Enter a valid email address"),

    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and punctuation marks(such a ! and &)."
      )
      .min(6, "Password should be atleast 6 characters")
      .max(24, "Password cannot be more than 24 characters"),
  });

  const registerSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        user
      );
      setError("");
      setLoading(false);
      setSuccess(data.message);

      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setSuccess("");
      setLoading(false);
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setOpenRegister(false)}></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bDay,
            bYear,
            bMonth,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            if (
              new Date() - new Date(bYear, bMonth + 1, bDay) <
              new Date(1970 + 14, 0, 1)
            ) {
              setGenderError("");
              setDateError(
                "It looks like you've entered the wrong info. Please make sure that you use your real date of birth"
              );
            } else if (gender === "") {
              setDateError("");
              setGenderError(
                "Please choose a gender. You can choose who can see this later."
              );
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  value={first_name}
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Last name"
                  name="last_name"
                  value={last_name}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or Email address"
                  name="email"
                  value={email}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New Password"
                  name="password"
                  value={password}
                  onChange={handleRegisterChange}
                />
              </div>

              <DateOfBirthSelect
                bDay={bDay}
                bYear={bYear}
                bMonth={bMonth}
                handleRegisterChange={handleRegisterChange}
                dateError={dateError}
              />
              <GenderSelect
                genderError={genderError}
                handleRegisterChange={handleRegisterChange}
              />
              <div className="reg_infos">
                By clicking 'Sign Up' you agree to our{" "}
                <span>Terms , Privacy Policy </span>
                and <span>Cookie Policy</span> . You may also receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup" type="submit">
                  Sign Up
                </button>
              </div>
              <ClipLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
