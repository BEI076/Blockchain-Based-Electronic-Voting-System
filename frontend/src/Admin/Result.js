import { useState, useEffect } from "react";
import { getVote, getCategory } from "../Api/ApiHandler";
import VoteResultComponent from "../components/VoteResultTable";
const Result = (props) => {
  const token = props.token;
  const refreshData = sessionStorage.getItem("refreshData");
  const [voteData, setVoteData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    getVote(token).then((response) => {
      //   console.log(response.data);
      setVoteData([...response.data]);

      getCategory(token).then((response) => {
        setCategoryData([...response.data]);
        // console.log(response.data);
      });
    });
  }, [token, refreshData]);
  return (
    <div className="container-item">
      {categoryData.map((item) => {
        // console.log(item);
        return (
          <>
            <h2>{item.name}</h2>
            <table class="styled-table">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Party</th>
                  <th>Votes</th>
                </tr>
              </thead>
              <tbody>
                {voteData.map((data) => {
                  if (item.name === data.category_name) {
                    return <VoteResultComponent key={data.r_id} item={data} />;
                  } else return null;
                })}
              </tbody>
            </table>
          </>
        );
      })}
    </div>
  );
};

export default Result;
