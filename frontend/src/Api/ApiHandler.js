import axios from "axios";
const baseurl = "http://localhost:3001";

// admin login
export const adminLogin = async (username, password) => {
  return await axios({
    method: "POST",
    url: baseurl + "/admin-login",
    data: {
      username: username,
      password: password,
    },
  }).then((response) => {
    return response.data;
  });
};

// create admin
export const createAdmin = async (username, password, token) => {
  console.log(token);
  return await axios({
    method: "POST",
    url: baseurl + "/create-admin",
    data: {
      username: username,
      password: password,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// create party
export const createParty = async (name, token) => {
  return await axios({
    method: "POST",
    url: baseurl + "/create-party",
    data: {
      name: name,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// get party
export const getParty = async (token) => {
  return await axios({
    method: "GET",
    url: baseurl + "/get-party",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "json",
  }).then((response) => {
    return response.data;
  });
};

// delete party
export const deleteParty = async (p_id, token) => {
  return await axios({
    method: "DELETE",
    url: baseurl + "/delete-party",
    data: {
      p_id: p_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};
// create category
export const createCategory = async (name, token) => {
  return await axios({
    method: "POST",
    url: baseurl + "/create-category",
    data: {
      name: name,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// get category
export const getCategory = async (token) => {
  return await axios({
    method: "GET",
    url: baseurl + "/get-category",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "json",
  }).then((response) => {
    return response.data;
  });
};

// delete category
export const deleteCategory = async (c_id, token) => {
  // console.log(`id = ${c_id}`);

  return await axios({
    method: "DELETE",
    url: baseurl + "/delete-category",
    data: {
      c_id: c_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};
// create candidate
export const createCandidate = async (
  name,
  address,
  citizenshipid,
  dob,
  c_id,
  p_id,
  token
) => {
  return await axios({
    method: "POST",
    url: baseurl + "/create-candidate",
    data: {
      name: name,
      address: address,
      citizenshipid: citizenshipid,
      dob: dob,
      c_id: c_id,
      p_id: p_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// get candidate
export const getCandidate = async (token) => {
  return await axios({
    method: "GET",
    url: baseurl + "/get-candidate",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "json",
  }).then((response) => {
    return response.data;
  });
};

// get full candidate
export const getFullCandidate = async (token) => {
  return await axios({
    method: "GET",
    url: baseurl + "/get-full-candidate",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "json",
  }).then((response) => {
    return response.data;
  });
};

// delete candidate
export const deleteCandidate = async (ca_id, token) => {
  return await axios({
    method: "DELETE",
    url: baseurl + "/delete-candidate",
    data: {
      ca_id: ca_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// create voter
export const createVoter = async (
  name,
  address,
  email,
  citizenshipid,
  dob,
  password,
  token
) => {
  return await axios({
    method: "POST",
    url: baseurl + "/create-voter",
    data: {
      name: name,
      address: address,
      email: email,
      citizenshipid: citizenshipid,
      dob: dob,
      password: password,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// get voter
export const getVoter = async (token) => {
  return await axios({
    method: "GET",
    url: baseurl + "/get-voter",
    responseType: "json",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// delete voter
export const deleteVoter = async (v_id, token) => {
  return await axios({
    method: "DELETE",
    url: baseurl + "/delete-voter",
    data: {
      v_id: v_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.data;
  });
};

// usr login
export const userLogin = async (email, password) => {
  return await axios({
    method: "POST",
    url: baseurl + "/user-login",
    data: {
      email: email,
      password: password,
    },
  }).then((response) => {
    // console.log(response.data);
    return response.data;
  });
};
