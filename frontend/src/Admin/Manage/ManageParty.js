import { useEffect, useState } from "react";

import { getParty } from "../../Api/ApiHandler";
import Party from "../../components/Party";

const ManageParty = (props) => {
  //defining state
  const [party, setParty] = useState([]);
  const [refresh, setRefresh] = useState("");
  const refreshData = sessionStorage.getItem("refreshData");

  const token = props.token;
  useEffect(() => {
    getParty(token).then((response) => {
      // console.log(response.data);
      setParty(response.data);
    });
  }, [token, refresh, refreshData]);
  // console.log(party);
  // console.log(typeof party);
  const refreshHnadler = (refreshData) => {
    setRefresh(refreshData);
  };

  return (
    <table class="styled-table">
      <thead>
        <tr>
          <th>S.N</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {party.map((item) => (
          <Party
            token={token}
            key={item.id}
            data={item}
            refreshHnadler={refreshHnadler}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ManageParty;
