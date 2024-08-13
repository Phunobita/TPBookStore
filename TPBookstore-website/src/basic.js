import { get, axios } from "axios";

export function checkProduct() {
  return get("https://tp-bookstore.herokuapp.com/api/v1/product/:624abe2f071a39dc8512adb0");
}
export function checkLogin(email, password) {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const { data } = axios.post(`https://tp-bookstore.herokuapp.com/api/v1/user/login`, { email, password }, config);
  return data;
}
