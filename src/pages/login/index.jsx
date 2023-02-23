import "./style.css";
import Footer from "../../components/login/Footer";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import { useState } from "react";

const Login = () => {
  const [openRegister, setOpenRegister] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setOpenRegister={setOpenRegister} />
        {openRegister && <RegisterForm setOpenRegister={setOpenRegister} />}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
