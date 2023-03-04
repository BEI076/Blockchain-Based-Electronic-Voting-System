import { useState, useEffect } from "react";
import Manage from "./Manage/Manage";
import Register from "./Register/Register";
import AdminLogin from "./AdminLogin";
import RegisterAdmin from "./Register/RegisterAdmin";
import Result from "./Result";

const Admin = () => {
  // defining states
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [token, setToken] = useState("");

  //   tab function
  const showForm = (formName) => {
    setActiveTab(formName);
  };

  // loggedin State Handler Function
  const loginStateHandler = (state, token) => {
    console.log("from admin");
    console.log(state);
    console.log(token);
    setToken(token);
    setIsLoggedin(state);
    sessionStorage.setItem("isLoggedin", JSON.stringify(state));
    sessionStorage.setItem("token", token);
  };

  useEffect(() => {
    const storedIsLoggedin = sessionStorage.getItem("isLoggedin");
    const storedToken = sessionStorage.getItem("token");
    if (storedIsLoggedin && storedToken) {
      setIsLoggedin(JSON.parse(storedIsLoggedin));
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      {!isLoggedin ? (
        <AdminLogin loginState={loginStateHandler} />
      ) : (
        <div className="admin-container">
          <h2>Admin Panel</h2>
          <div className="form-tabs">
            {/* register admin */}
            <button
              className={`tab ${activeTab === "admin" ? "active" : ""}`}
              onClick={() => showForm("admin")}
            >
              Add Admin
            </button>
            {/* manage */}
            <button
              className={`tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => showForm("login")}
            >
              Manage
            </button>
            {/* register */}
            <button
              className={`tab ${activeTab === "register" ? "active" : ""}`}
              onClick={() => showForm("register")}
            >
              Register
            </button>

            {/* vote result */}
            <button
              className={`tab ${activeTab === "result" ? "active" : ""}`}
              onClick={() => showForm("result")}
            >
              Vote Result
            </button>
          </div>
          {/* register admin form */}
          <div
            id="admin-form"
            className={`form-content ${activeTab === "admin" ? "active" : ""}`}
          >
            <RegisterAdmin token={token} />
          </div>
          {/* manage  */}
          <div
            id="login-form"
            className={`form-content ${activeTab === "login" ? "active" : ""}`}
          >
            <Manage token={token} loginState={loginStateHandler} />
          </div>
          {/* register form  */}
          <div
            id="register-form"
            className={`form-content ${
              activeTab === "register" ? "active" : ""
            }`}
          >
            <Register token={token} />
          </div>

          {/* result */}
          <div
            id="result-form"
            className={`form-content ${
              activeTab === "result" ? "active" : ""
            }`}
          >
            <Result token={token} />
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
