import { useEffect, useState } from "react";
import { getCategory } from "../../Api/ApiHandler";
import Category from "../../components/Category";
const ManageCategory = (props) => {
  const token = props.token;
  const [categoryData, setCategoryData] = useState([]);
  const [refresh, setRefresh] = useState("");

  const refreshData = sessionStorage.getItem("refreshData");

  useEffect(() => {
    getCategory(token).then((response) => {
      setCategoryData(response.data);
    });
  }, [token, refresh,refreshData ]);

  const refreshHandler = (data) => {
    setRefresh(data);
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
        {categoryData.map((item) => {
          return (
            <Category
              token={token}
              refreshHandler={refreshHandler}
              item={item}
            />
          );
        })}
      </tbody>
    </table>
  );
};
export default ManageCategory;
