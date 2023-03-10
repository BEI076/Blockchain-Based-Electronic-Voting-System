import { useEffect, useState } from "react";
import { getAdmin, deleteAdmin } from "../../Api/ApiHandler";

const ManageAdmin = (props) => {
  const [adminData, setAdminData] = useState([]);
  const [refresh, setRefresh] = useState();
  const token = props.token;
  useEffect(() => {
    getAdmin(token).then((response) => {
      try {
        setAdminData(response.data);
        console.log(response.data);
      } catch {
        console.log(response);
      }
    });
  }, [token, refresh]);

  const deleteHandler = (e) => {
    // console.log(e.target.value);
    deleteAdmin(e.target.value, token).then((response) => {
      console.log(response);
      setRefresh(Math.random());
    });
  };

  return (
    <div className="admin_container">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {adminData.map((item) => {
            return (
              <tr>
                <td>{item.username}</td>
                <button onClick={deleteHandler} value={item.a_id} type="submit">
                  Delete
                </button>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageAdmin;
