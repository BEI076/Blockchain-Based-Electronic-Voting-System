import ManageCandidate from "./ManageCandidate";
import ManageCategory from "./ManageCategory";
import ManageParty from "./ManageParty";
import ManageVoter from "./ManageVoter";

import { countVote, deleteVote } from "../../Api/ApiHandler";

const Manage = (props) => {
  const token = props.token;
  const logout = () => {
    props.loginState(false);
  };

  const publish = (e) => {
    countVote(token).then((response) => {
      // console.log(response.data);
      sessionStorage.setItem("refreshData", Math.random());
    });
  };

  const clear = (e) => {
    deleteVote(token).then((response) => {
      console.log("votes cleared");
      sessionStorage.setItem("refreshData", Math.random());
    });
  };
  return (
    <div>
      <button onClickCapture={logout} type="submit">
        Logout
      </button>
      <button onClickCapture={publish} className="publish-btn" type="submit">
        Publish Vote
      </button>
      <button onClickCapture={clear} className="clear-btn" type="submit">
        Clear Vote
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
