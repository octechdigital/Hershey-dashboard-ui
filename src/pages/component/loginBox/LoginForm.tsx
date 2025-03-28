import "./style.scss";
import userLogo from "../../../assets/User.svg";
import password_logo from "../../../assets/Password.svg";
import React, { useEffect, useState } from "react";
import { InputField } from "../inputFieldComponent/InputField";
import { Form, Formik } from "formik";
import { LoginSchema } from "../../../schemas";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { BaseUrlApi } from "../../../lib/axios-instances";

export function LoginForm() {
  const [passwordType, setPasswordType] = useState("password");
  const [loginSnackbarOpen, setLoginSnackbarOpen] = useState(false); // Add snackbar
  const [errSnackbarOpen, setErrSnackbarOpen] = useState(false); // Add snackbar
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  const navigate = useNavigate();

  async function login(email: string, password: string) {
    setLoading(true); // Show loader when API call starts

    let bodyContent = JSON.stringify({ email: email, password: password });
    BaseUrlApi.post(
      "/admin/login",
      {
        email: email,
        password: password,
      },
      {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then(async (response) => {
        setLoading(false); // Hide loader when API call is successful
        const data = response.data;
        if (data.statusCode === 200) {
          localStorage.setItem("token", data.data.token);
          setLoginSnackbarOpen(true);
          navigate("/dashboard");
        } else {
          console.log("Login failed");
          setErrSnackbarOpen(true);
        }
      })
      .catch((error) => {
        setLoading(false); // Hide loader when API call fails
        setErrorMessage(error.response?.data?.message || "An error occurred");
        setErrSnackbarOpen(true);
        // console.log(error.response.data.message);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <section className="login-div">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            login(values.email, values.password);
          }}
        >
          {({ errors, touched }) => (
            <Form className="formValidation">
              <h1 className="">Login</h1>
              <div className="login-reg">
                <div className="login-email">
                  <div className="emailInput">
                    <img className="userLogo" src={userLogo} alt="User Logo" />
                    <InputField
                      placeholder="User name"
                      type="text"
                      name="email"
                      isFormikRequired={true}
                    />
                  </div>
                </div>
                {errors.email && touched.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}

                <div className="login-input-divider" />
                <div className="login-password">
                  <div className="passwordInput">
                    <img
                      className="passwordLogo"
                      src={password_logo}
                      alt="Password Logo"
                    />
                    <InputField
                      placeholder="Password"
                      type={passwordType}
                      name="password"
                      isFormikRequired={true}
                    />
                  </div>
                </div>
                {errors.password && touched.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </Form>
          )}
        </Formik>
        <Snackbar
          open={loginSnackbarOpen}
          autoHideDuration={3000}
          onClose={() => setLoginSnackbarOpen(false)}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={() => setLoginSnackbarOpen(false)}
            severity="success"
          >
            Login successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={errSnackbarOpen}
          autoHideDuration={6000}
          onClose={() => setErrSnackbarOpen(false)}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        >
          <Alert
            onClose={() => setErrSnackbarOpen(false)}
            severity="error"
            sx={{ width: "100%", display: "flex" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </section>
      {/* Conditionally render loader */}
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}
