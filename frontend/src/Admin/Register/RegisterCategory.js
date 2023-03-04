import { useState } from "react";
import { createCategory } from "../../Api/ApiHandler";

const RegisterCategory = (props) => {
  const token = props.token;

  // defining state
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    createCategory(name, token).then((response) => {
      setAlert(response.message);
      setName("");
      sessionStorage.setItem("refreshData", Math.random());

    });
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <label for="text">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter category"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <button type="submit">Add Category</button>
      </form>
      <div class="alert">{alert}</div>
    </>
  );
};
export default RegisterCategory;
