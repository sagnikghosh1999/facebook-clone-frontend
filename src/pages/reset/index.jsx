import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import "./style.css";
import CodeVerification from "./CodeVerification";
import Footer from "../../components/login/Footer";
import ChangePassword from "./ChangePassword";
export default function Reset() {
  const { user } = useSelector((user) => ({ ...user }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [userInfos, setUserInfos] = useState({});

  return (
    <div className="reset">
      <div className="reset_header">
        <img src="/icons/facebook.svg" alt="facebook logo" />
        {user ? (
          <div className="right_reset">
            <Link to={"/profile"}>
              <img src={user?.picture} alt={user?.first_name} />
            </Link>
            <button
              className="blue_btn"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to={"/login"} className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            error={error}
            setEmail={setEmail}
            loading={loading}
            setLoading={setLoading}
            setError={setError}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfos && (
          <SendEmail
            userInfos={userInfos}
            email={email}
            error={error}
            setError={setError}
            loading={loading}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
            setLoading={setLoading}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            code={code}
            setCode={setCode}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfos={userInfos}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            setPassword={setPassword}
            confPassword={confPassword}
            setConfPassword={setConfPassword}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfos={userInfos}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
