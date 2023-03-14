import { useState, useEffect } from "react";
import { registeAndBroadcastNode, getNetworkNodes } from "../Api/ApiHandler";

const NodeManage = (props) => {
  const token = props.token;
  const [alert, setAlert] = useState("");
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [nodes, setNodes] = useState([]);
  const [refresh, setRefresh] = useState("");

  useEffect(() => {
    getNetworkNodes(token)
      .then((response) => {
        setNodes(response.data || []);
        // setNodes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token, refresh]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newNodeUrl = `http://${ip}:${port}`;
    registeAndBroadcastNode(newNodeUrl, token)
      .then((response) => {
        setAlert(response.data.note);
        setRefresh(Math.random());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="node-container">
      <form onSubmit={submitHandler}>
        <label htmlFor="ip">IP Address</label>
        <input
          type="text"
          id="ip"
          required
          placeholder="Enter IP Address Of Running Node"
          onChange={(e) => setIp(e.target.value)}
        />
        <label htmlFor="port">Port</label>
        <input
          type="number"
          id="port"
          required
          placeholder="Enter Port Number"
          onChange={(e) => setPort(e.target.value)}
        />
        <button type="submit">Connect</button>
      </form>
      {alert && <div className="alert">{alert}</div>}
      <div className="manage-node">
        <h3>Current Nodes In The Network</h3>
        <ul>
          {nodes.length > 0 && nodes.map((node) => <li key={node}>{node}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default NodeManage;
