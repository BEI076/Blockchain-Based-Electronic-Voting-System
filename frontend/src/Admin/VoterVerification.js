import { useEffect, useState } from "react";
import { getRawData } from "../Api/ApiHandler";
import RawVoter from "../components/RawVoter";

const VoterVerification = (props) => {
  const token = props.token;
  const [voterIdData, setVoterIdData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getRawData(token).then((response) => {
      setVoterIdData(response.data);
      console.log(response.data);
    });
  }, [refresh]);

  const refreshHandler = () => {
    console.log("refresh Handler called");
    setRefresh(!refresh);
  };
  return (
    <div>
      <h2>Pending Approvals</h2>
      {voterIdData.map((data) => {
        const img1 = process.env.REACT_APP_API_URL + data.imageUrl1;
        const img2 = process.env.REACT_APP_API_URL + data.imageUrl2;
        if (data.flag === 0) {
          return (
            <RawVoter
              key={data.v_id}
              data={data}
              img1={img1}
              img2={img2}
              refreshHandler={refreshHandler}
              token={token}
            />
          );
        } else return null;
      })}
    </div>
  );
};

export default VoterVerification;
