import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
  const nonExisting = {
    id: 999,
    content: "This note is not saved",
    important: false,
  };
  return axios
    .get(baseUrl)
    .then((response) => response.data.concat(nonExisting));
};

const create = (newObj) => {
  return axios.post(baseUrl, newObj).then((response) => response.data);
};

const update = (id, newObj) => {
  return axios
    .put(`${baseUrl}/${id}`, newObj)
    .then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
};
