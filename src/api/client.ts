import axios from "axios";

export const client = axios.create({
  baseURL: "https://wf-challenge-abqs4otg74.herokuapp.com/api/v1",
  timeout: 3000,
});
