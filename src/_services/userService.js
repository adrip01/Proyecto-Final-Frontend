import axios from "axios";

import { global } from "../_config/global";

const userService = {};

userService.getAll = async (token, page = 1) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/users`,
    params: { page: page },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getProfile = async (token) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/users/profile`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.saveProfile = async (token, user) => {
  const options = {
    method: "POST",
    url: `${global.BASE_API_URL}/users/update-profile`,
    data: user,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getMyCardsTasks = async (token) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/users/user-cards-tasks`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.createCard = async (token, data) => {
  const options = {
    method: "POST",
    url: `${global.BASE_API_URL}/users/create-card`,
    data: data,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.createTaskForCard = async (token, data, id) => {
  const options = {
    method: "POST",
    url: `${global.BASE_API_URL}/users/create-task/${id}`,
    data: data,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getTypes = async (token) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/users/types`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getCard = async (token, id) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/users/card/${id}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.getTask = async (token, id) => {
  const options = {
    method: "GET",
    url: `${global.BASE_API_URL}/users/task/${id}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  //await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.deleteCard = async (token, id) => {
  const options = {
    method: "DELETE",
    url: `${global.BASE_API_URL}/users/delete-card/${id}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

userService.deleteTask = async (token, id) => {
  const options = {
    method: "DELETE",
    url: `${global.BASE_API_URL}/users/delete-task/${id}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  // await sleep(2000); // TODO
  const response = await axios.request(options);
  return response.data;
};

export default userService;
