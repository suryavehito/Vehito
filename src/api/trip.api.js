import {
  TRIP_ADD,
  TRIP_GET_ALL,
  TRIP_GET_ALL_ANAYLTICS_DATA,
  TRIP_GET_BY_ID,
  TRIP_UPDATE,
} from "./constant";
import api from "./vehitoEnzoBaseAPI";

export const addTrip = async (data) => {
  const ownerId = sessionStorage.getItem("userId");
  const result = await api.post(
    TRIP_ADD.replace(":userId", ownerId),
    { ...data, ownerId },
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const updateTrip = async (data) => {
  const ownerId = sessionStorage.getItem("userId");
  const result = await api.put(
    TRIP_UPDATE.replace(":userId", ownerId),
    { ...data, ownerId, status: parseInt(data.status) },
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const getAllTrip = async (data) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.get(TRIP_GET_ALL.replace(":userId", userId), {
    headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
  });
  return result.data;
};

export const getTripDetailById = async (tripId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.get(TRIP_GET_BY_ID.replace(":tripId", tripId), {
    headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
  });
  return result.data;
};

export const getAllTripAnalyticData = async (assetId) => {
  const result = await api.get(
    TRIP_GET_ALL_ANAYLTICS_DATA.replace(":assetId", assetId),
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const getTripDetailByUsingTripId = async (tripId) => {
  const result = await api.get(TRIP_GET_BY_ID.replace(":tripId", tripId), {
    headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
  });
  return result.data;
};
