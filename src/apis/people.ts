import axios from "axios";

function axiosInstance() {
  return axios.create({
    baseURL: "http://localhost:3001"
  })
}

const instance = axiosInstance();
export const fetchPeople = () => {
  return instance.get('people')
}