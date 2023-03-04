import ManageCandidate from "./ManageCandidate";
import ManageCategory from "./ManageCategory";
import ManageParty from "./ManageParty";
import ManageVoter from "./ManageVoter";

const Manage = (props) => {
  const token = props.token;
  const logout = () => {
    props.loginState(false);
  };
  return (
    <div>
      <button onClickCapture={logout} type="submit">
        Logout
      </button>
      <div class="container-item">
        <h2>Manage Party</h2>
        <ManageParty token={token} />
      </div>

      <div class="container-item">
        <h2>Manage Category</h2>
        <ManageCategory token={token} />
      </div>
      <div class="container-item">
        <h2>Manage Candidate</h2>
        <ManageCandidate token={token} />
      </div>
      <div class="container-item">
        <h2>Manage Voter</h2>
        <ManageVoter token={token} />
      </div>
    </div>
  );
};

export default Manage;
