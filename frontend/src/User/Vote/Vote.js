import { useState, useEffect } from "react";
import { getCategory, getFullCandidate } from "../../Api/ApiHandler";
const Vote = (props) => {
  const token = props.token;
  // console.log(`token = ${token}`);
  const data = props.data;

  // defining sates
  const [voterId, setVoterId] = useState("");
  const [alert, setAlert] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);

  const [category, setCategory] = useState("");
  const [candidate, setCandidate] = useState("");

  //logout function
  const logout = (e) => {
    e.preventDefault();
    setVoterId("");
    props.loginState(false);
  };

  // fetching category and party details
  useEffect(() => {
    getCategory(token).then((response) => {
      setCategoryData(response.data);
      // console.log("category data");
      // console.log(response.data);
    });
    getFullCandidate(token).then((response) => {
      setCandidateData(response.data);
      // console.log("candidate data");
      // console.log(response.data);
    });
  }, [token]);

  // vote handler function
  const voteHandler = (e) => {
    e.preventDefault();
    // props.loginState(true);
    setVoterId("");
  };

  return (
    <div class="vote-container">
      <div class="voter-info-container">
        <span class="head">Voter Information</span>
        <span class="name">Name = {data.name}</span>
        <span class="address">Address = {data.address}</span>
        <span class="email">Email = {data.email}</span>
        <span class="email">DOB = {data.dob}</span>
        <span class="voter-id">Voter Id = {data.voter_id}</span>
      </div>

      <button onClickCapture={logout} type="submit">
        Logout
      </button>

      <div class="vote-form-container">
        <h2>Please Choose the Candidates and Enter Voter Id </h2>
        <form onSubmit={voteHandler}>
          <div class="form-item-container">
            {categoryData.map((item) => {
              return (
                <div class="form-item">
                  <label for="category">{item.name}:</label>
                  <select name="category" id="category">
                    <option value="null" hidden selected>
                      Choose your candidate
                    </option>
                    {candidateData.map((data) => {
                      if (item.name === data.category_name) {
                        return <option value="President">{data.name}</option>;
                      } else {
                        return null;
                      }
                    })}
                  </select>
                </div>
              );
            })}
          </div>

          <label for="voter-id">Voter Id:</label>
          <input
            type="number"
            id="voter-id"
            name="voter-id"
            placeholder="Enter your voter id"
            onChange={(e) => setVoterId(e.target.value)}
            value={voterId}
            required
          />
          <button type="submit">Cast your vote</button>
        </form>
        <div class="alert">You Have Successfully Voted</div>
      </div>
    </div>
  );
};

export default Vote;
