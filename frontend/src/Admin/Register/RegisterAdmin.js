import { useState } from "react";
import { createAdmin } from "../../Api/ApiHandler";

const RegisterAdmin = (props) => {
  const token = props.token;

  // defining states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  // submit handler function
  const submitHandler = (e) => {
    e.preventDefault();
    createAdmin(username, password, token).then((response) => {
      // console.log(response.message);
      setAlert(response.message);
      setUsername("");
      setPassword("");
      sessionStorage.setItem("refreshData", Math.random());
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={submitHandler}>
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        <label for="text">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type="submit">Add Admin</button>
      </form>
      <div class="alert">{alert}</div>
    </div>
  );
};
export default RegisterAdmin;
