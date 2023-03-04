import { useState, useEffect } from "react";
import { getVoter } from "../../Api/ApiHandler";
import Voter from "../../components/Voter";
const ManageVoter = (props) => {
  // defining states
  const [voterData, setVoterData] = useState([]);
  const [refresh, setRefresh] = useState("");

  const refreshData = sessionStorage.getItem("refreshData");


  const token = props.token;
  useEffect(() => {
    getVoter(token).then((response) => {
      setVoterData(response.data);
    });
  }, [token, refresh, refreshData]);

  const refreshHandler = (refreshData) => {
    setRefresh(refreshData);
  };

  return (
    <table class="styled-table">
      <thead>
        <tr>
          <th>S.N</th>
          <th>Name</th>
          <th>Address</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {voterData.map((item) => {
          return (
            <Voter item={item} token={token} refreshHandler={refreshHandler} />
          );
        })}
      </tbody>
    </table>
  );
};

export default ManageVoter;
