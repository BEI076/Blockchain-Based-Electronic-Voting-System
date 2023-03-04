import { useState } from "react";
import { createParty } from "../../Api/ApiHandler";
const RegisterParty = (props) => {
  const token = props.token;

  // defining state
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    createParty(name, token).then((response) => {
      console.log(response);
      setAlert(response.message);
      setName("");
      sessionStorage.setItem("refreshData", Math.random());

      // window.location.reload();
    });
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <label for="text">Party:</label>
        <input
          type="text"
          id="party"
          name="party"
          placeholder="Enter name of party"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <button type="submit">Add Party</button>
      </form>
      <div class="alert">{alert}</div>
    </>
  );
};

export default RegisterParty;
