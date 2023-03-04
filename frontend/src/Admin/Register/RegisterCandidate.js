import { useState, useEffect } from "react";
import { getCategory } from "../../Api/ApiHandler";
import { getParty } from "../../Api/ApiHandler";
import { createCandidate } from "../../Api/ApiHandler";

const RegisterCandidate = (props) => {
  const token = props.token;
  // defining states
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [citizenshipId, setCitizenshipId] = useState("");
  const [dob, setDob] = useState("");
  const [category, setCategory] = useState("");
  const [party, setParty] = useState("");
  const [alert, setAlert] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [partyData, setPartyData] = useState([]);

  const refreshData = sessionStorage.getItem("refreshData");
  // const refreshDelete = sessionStorage.getItem("delete");

  

  // fetching Categories and
  useEffect(() => {
    getParty(token).then((response) => {
      setPartyData(response.data);
    });
    getCategory(token).then((response) => {
      setCategoryData(response.data);
    });
  }, [token, refreshData]);

  const submitHandler = (e) => {
    e.preventDefault();
    createCandidate(
      name,
      address,
      citizenshipId,
      dob,
      category,
      party,
      token
    ).then((response) => {
      setAlert(response.message);
      sessionStorage.setItem("refreshData", Math.random());
    });
    console.log({
      name: name,
      address: address,
      dob: dob,
      citizenshipId: citizenshipId,
      c_id: category,
      p_id: party,
    });

    setName("");
    setAddress("");
    setDob("");
    setCitizenshipId("");
    setCategory("");
    setParty("");
  };

  return (
    <>
      <form onSubmit={submitHandler}>
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
          placeholder="Enter your address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          required
        />
        <label for="citizenshipId">Citizenship ID:</label>
        <input
          type="number"
          id="citizenshipId"
          name="citizenshipId"
          placeholder="Enter your citizenship ID"
          onChange={(e) => setCitizenshipId(e.target.value)}
          value={citizenshipId}
          required
        />
        <label for="dob">Date of birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          placeholder="Enter your Date of birth"
          onChange={(e) => setDob(e.target.value)}
          value={dob}
          required
        />
        <label for="category">Category:</label>
        <select
          name="category"
          id="category"
          onClick={(e) => setCategory(e.target.value)}
        >
          <option value="null" hidden selected disabled>
            Choose Category
          </option>
          {categoryData.map((item) => {
            return (
              <option key={item.c_id} value={item.c_id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <label for="party">Party:</label>

        <select
          name="party"
          id="party"
          onClick={(e) => setParty(e.target.value)}
        >
          <option value="null" hidden selected disabled>
            Choose Party
          </option>
          {partyData.map((item) => {
            return (
              <option key={item.p_id} value={item.p_id}>
                {item.name}
              </option>
            );
          })}
        </select>

        <button type="submit">Add Candidate</button>
      </form>
      <div class="alert">{alert}</div>
    </>
  );
};
export default RegisterCandidate;
