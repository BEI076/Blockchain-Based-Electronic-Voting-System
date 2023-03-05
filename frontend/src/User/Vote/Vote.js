import { useState, useEffect } from "react";
import { getCategory, getVoterByVoterId } from "../../Api/ApiHandler";
import CategorySelection from "./CategorySelection";
const Vote = (props) => {
  const token = props.token;
  // console.log(`token = ${token}`);

  const voterInfo = JSON.parse(sessionStorage.getItem("voterInfo"));
  // console.log(` voterInfo= ${voterInfo}`);

  // defining sates
  const [voterId, setVoterId] = useState("");
  const [alert, setAlert] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [filterVoteData, setfilterVoteData] = useState([]);

  //logout function
  const logout = (e) => {
    e.preventDefault();
    setVoterId("");
    sessionStorage.clear();
    props.loginState(false);
  };

  // fetching category
  useEffect(() => {
    getCategory(token).then((response) => {
      setCategoryData(response.data);
      // console.log(response.data)
    });
  }, [token]);

  // vote data filter function
  const filterVoteDataHandler = (data) => {
    const newFilteredData = filterVoteData.filter((item) => {
      if (item.category_name !== data.category_name) {
        // console.log(`item = ${item}`)
        return item;
      } else return null;
    });
    setfilterVoteData([...newFilteredData, data]);
  };

  // console.log(filterVoteData);

  // voter id handler

  // vote handler function
  const voteHandler = (e) => {
    e.preventDefault();
    const transaction = [];
    filterVoteData.map((item) => {
      transaction.push({
        ...item,
        voter_address: voterInfo.voter_address,
      });
    });
    console.log(transaction);
  };

  return (
    <div class="vote-container">
      <div class="voter-info-container">
        <span class="head">Voter Information</span>
        <span class="name">Name = {voterInfo.name}</span>
        <span class="address">Address = {voterInfo.address}</span>
        <span class="email">Email = {voterInfo.email}</span>
        <span class="email">DOB = {voterInfo.dob.substring(0, 10)}</span>
        <span class="voter-id">Voter Id = {voterInfo.voter_id}</span>
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
                <CategorySelection
                  key={item.c_id}
                  item={item}
                  token={token}
                  filterVoteData={filterVoteDataHandler}
                />
              );
            })}
          </div>

          <label for="voter-id">Voter Id:</label>
          <input
            type="number"
            id="voter-id"
            name="voter-id"
            placeholder="Enter your voter id"
            value={voterInfo.voter_id}
            disabled
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
