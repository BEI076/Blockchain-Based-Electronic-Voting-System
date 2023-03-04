
import { useState } from "react";
import { createVoter } from "../../Api/ApiHandler";
const Register = (props) => {
  const token = props.token;
  // defining states
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [citizenshipId, setCitizenshipId] = useState("");
  const [alert, setAlert] = useState("");

  //   register function
  const register = (e) => {
    e.preventDefault();

    createVoter(name, address, email, citizenshipId, dob, password, token).then(
      (response) => {
        setAlert(response.message);
      }
    );

    setName("");
    setEmail("");
    setAddress("");
    setDob("");
    setPassword("");
  };
  return (
    <>
      <form onSubmit={register}>
        <label for="full-name">Full Name:</label>
        <input
          type="text"
          id="full-name"
          name="full-name"
          placeholder="Enter your full name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <label for="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter your address (province, District)"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          required
        />
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label for="citizenshipid">citizenship Id:</label>
        <input
          type="number"
          id="citizenshipid"
          name="citizenshipid"
          placeholder="Enter your Citizenship Id"
          onChange={(e) => setCitizenshipId(e.target.value)}
          value={citizenshipId}
          required
        />

        <label for="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          placeholder="Enter your date of birth"
          onChange={(e) => setDob(e.target.value)}
          value={dob}
          required
        />

        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type="submit">Register</button>
      </form>
      <div class="alert">{alert}</div>
    </>
  );
};

export default Register;
