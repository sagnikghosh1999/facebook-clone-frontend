import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";

export default function ChangePassword({
  password,
  confPassword,
  setPassword,
  setConfPassword,
  error,
}) {
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and punctuation marks(such a ! and &)."
      )
      .min(6, "Password should be atleast 6 characters")
      .max(24, "Password cannot be more than 24 characters"),
    confPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passowrd must be same "),
  });
  return (
    <div className="reset_form" style={{ height: "310px" }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Pick a strong password.</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          confPassword,
        }}
        validationSchema={validatePassword}
      >
        {(formik) => (
          <Form>
            <LoginInput
              placeholder={"New Password"}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginInput
              placeholder={"Confirm Password"}
              type="password"
              name="confPassword"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
