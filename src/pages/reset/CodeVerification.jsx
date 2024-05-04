import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";

export default function CodeVerification({ code, setCode, error }) {
  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .min(5, "Code must be 5characters.")
      .max(5, "Code must be 5characters."),
  });
  return (
    <div className="reset_form">
      <div className="reset_form_header">Code Verification</div>
      <div className="reset_form_text">
        Please enter the code sent to your email.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          code,
        }}
        validationSchema={validateCode}
      >
        {(formik) => (
          <Form>
            <LoginInput
              placeholder={"Code"}
              type="text"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
