import { deleteCandidate } from "../Api/ApiHandler";
const Candidate = (props) => {
  const item = props.item;

  const deleteHandler = () => {
    console.log(`token = ${props.token}`);
    deleteCandidate(item.ca_id, props.token).then((response) => {
      props.refreshHnadler(Math.random());
      sessionStorage.setItem("refreshData", Math.random());

      console.log(response);
    });
  };

  return (
    <tr key={item.ca_id}>
      <td>{item.ca_id}</td>
      <td>{item.name}</td>
      <td>{item.address}</td>
      <td>{item.citizenshipid}</td>
      <td>{item.dob}</td>
      <td>{item.category_name}</td>
      <td>{item.party_name}</td>
      <td class="action" onClickCapture={deleteHandler}>
        Delete
      </td>
    </tr>
  );
};

export default Candidate;
