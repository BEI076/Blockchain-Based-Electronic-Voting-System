import { getFullCandidate } from "../../Api/ApiHandler";
import { useEffect, useState } from "react";
import Candidate from "../../components/Candidate";

const ManageCandidate = (props) => {
  const token = props.token;

  // defining state
  const [candidateData, setCandidateData] = useState([]);
  const [refresh, setRefresh] = useState("");
  const refreshData = sessionStorage.getItem("refreshData");


  useEffect(() => {
    getFullCandidate(token).then((response) => {
      console.log("candidate data: ");
      console.log(response.data);
      setCandidateData(response.data);
    });
  }, [token, refresh, refreshData]);

  const refreshHnadler = (refreshData) => {
    console.log("triggered")
    setRefresh(refreshData);
  };

  return (
    <table class="styled-table">
      <thead>
        <tr>
          <th>S.N</th>
          <th>Name</th>
          <th>Address</th>
          <th>Citizenship ID</th>
          <th>DOB</th>
          <th>Category</th>
          <th>Party</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {candidateData.map((item) => {
          return (
            <Candidate
              key={item.ca_id}
              item={item}
              refreshHnadler={refreshHnadler}
              token={token}
            />
          );
        })}
      </tbody>
    </table>
  );
};
export default ManageCandidate;
