import axios from "axios";

import { global } from "../_config/global";

const authService = {};

authService.login = async (credentials) => {
  const options = {
    method: "POST",
    url: `${global.BASE_API_URL}/auth/login`,
    data: credentials,
  };

  const response = await axios.request(options);
  return response.data;
};

authService.register = async (user) => {
  const options = {
    method: "POST",
    url: `${global.BASE_API_URL}/auth/register`,
    data: user,
  };

  const response = await axios.request(options);
  return response.data;
};

export default authService;
