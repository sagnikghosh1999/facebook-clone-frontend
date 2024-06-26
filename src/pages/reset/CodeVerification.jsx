import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import axios from "axios";

export default function CodeVerification({
  code,
  setCode,
  error,
  loading,
  setLoading,
  setError,
  setVisible,
  userInfos,
}) {
  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .min(5, "Code must be 5characters.")
      .max(5, "Code must be 5characters."),
  });
  const verifyCode = async () => {
    const { email } = userInfos;
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateresetcode`,
        { email, code }
      );
      setError("");
      setVisible(3);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
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
        onSubmit={() => {
          verifyCode();
        }}
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
