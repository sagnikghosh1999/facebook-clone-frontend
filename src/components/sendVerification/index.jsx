import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";

export default function SendVerification() {
  const { user } = useSelector((user) => ({ ...user }));

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendVerification = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/resendverification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="send_verification">
      <span>
        Your account is not verified, verify your account before it gets deleted
        after a month from creating.
      </span>
      <Link
        className="send_verification_link"
        onClick={() => {
          sendVerification();
        }}
      >
        Click here to resend verification link.
      </Link>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
}
