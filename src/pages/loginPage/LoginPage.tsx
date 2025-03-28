import "./style.scss";
import { LoginForm } from "../component/loginBox/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hershay_bottle_logo from "../../assets/Hershey-bottle-logo.png";
import topHersheyLogo from "../../assets/Hershey-logo.png";

export default function LoginPage() {
  return (
    <>
      <div className="topLogo">
        <div className="logo-container">
          <img src={topHersheyLogo} alt="" />
        </div>
      </div>
      <div className="loginPage">
        <div className="hershay_bottle">
          <img src={hershay_bottle_logo} alt="" />
        </div>
        <LoginForm />
      </div>
    </>
  );
}
