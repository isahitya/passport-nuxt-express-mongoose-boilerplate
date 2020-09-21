import axios from "axios";
let apiLogic = {
  apiURL: `http://localhost:5000`,
  jsonRequestOptions: {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  },
  async registerUser(user) {
    try {
      const response = await axios.post(
        this.apiURL + "/register",
        user,
        this.jsonRequestOptions
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
};

export default (context, inject) => {
  inject("apiLogic", apiLogic);
};
