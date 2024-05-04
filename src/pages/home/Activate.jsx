import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import ActivateForm from "./ActivateForm";
import "./style.css";

export default function Activate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  const { token } = useParams();

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const activateAccount = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setSuccess(data.message);

      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: "VERIFY",
        payload: true,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  useEffect(() => {
    activateAccount();
  }, []);

  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          text={success}
          header="Account Verification Successful"
          loading={loading}
        />
      )}{" "}
      {error && (
        <ActivateForm
          type="error"
          text={error}
          header="Account Verification Failed"
          loading={loading}
        />
      )}
      <Header />
      <LeftHome />
      <div className="home_middle">
        <Stories />
        <CreatePost />
      </div>
      <RightHome />
    </div>
  );
}
