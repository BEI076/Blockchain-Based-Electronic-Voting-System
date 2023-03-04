import { useState } from "react";
import RegisterCandidate from "./RegisterCandidate";
import RegisterCategory from "./RegisterCategory";
import RegisterParty from "./RegisterParty";

const Register = (props) => {
  const token = props.token;

  // defining states
  // const [isLoggedin, setIsLoggedin] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  //   tab function
  const showForm = (formName) => {
    setActiveTab(formName);
  };

  // refresh Handler function
  return (
    <>
      <div class="form-container">
        <div class="form-tabs">
          {/* party */}
          <button
            className={`tab ${activeTab === "party" ? "active" : ""}`}
            onClick={() => showForm("party")}
          >
            Party
          </button>
          {/* category */}
          <button
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => showForm("login")}
          >
            Add Category
          </button>
          {/* candidate */}
          <button
            className={`tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => showForm("register")}
          >
            Add Candidate
          </button>
        </div>

        <div
          id="party-form"
          className={`form-content ${activeTab === "party" ? "active" : ""}`}
        >
          <h2>Add Party</h2>
          <RegisterParty token={token} />
        </div>

        <div
          id="login-form"
          className={`form-content ${activeTab === "login" ? "active" : ""}`}
        >
          <h2>Add Category</h2>
          <RegisterCategory token={token} />
        </div>
        <div
          id="register-form"
          className={`form-content ${activeTab === "register" ? "active" : ""}`}
        >
          <h2>Add Candidate</h2>
          <RegisterCandidate token={token} />
        </div>
      </div>
    </>
  );
};

export default Register;
