import api from "./vehitoFleetBaseAPI";
import {
  USER_GET_PROFILE,
  USER_LOGIN,
  USER_SIGN_UP,
  USER_UPDATE_PREFERENCES,
  USER_UPDATE_PROFILE,
} from "./constant";

export const signup = async (data) => {
  const result = await api.post(USER_SIGN_UP, data);
  return result.data;
};

export const login = async (data) => {
  const result = await api.post(USER_LOGIN, data);
  return result.data;
};

export const getUserDetailsByUserId = async (userId) => {
  const result = await api.get(USER_GET_PROFILE.replace(":userId", userId));
  return result.data;
};

export const editUserDetails = async (data) => {
  const result = await api.put(USER_UPDATE_PROFILE, data);
  return result.data;
};

export const updatePreferences = async (data) => {
  const ownerId = sessionStorage.getItem("userId");
  const result = await api.post(
    USER_UPDATE_PREFERENCES,
    { ...data, ownerId },
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
      baseURL: process.env.REACT_APP_ENZO_API_BASE_URL,
    }
  );
  return result.data;
};
