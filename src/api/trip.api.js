import {
  GET_ACTIVE_TRIP_BY_ASSET_ID,
  TRIP_ADD,
  TRIP_GET_ALL,
  TRIP_GET_ALL_ANAYLTICS_DATA,
  TRIP_GET_BY_ID,
  TRIP_UPDATE,
  GET_ALL_TRIPS_BY_USING_ASSET_ID,
} from "./constant";
import api from "./vehitoEnzoBaseAPI";
import vtsApi from "./vtsBaseApi";

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

export const getAllTrips = async (assetId) => {
  const result = await api.get(
    GET_ALL_TRIPS_BY_USING_ASSET_ID.replace(":assetId", assetId),
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const getTripDetailById = async (tripId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.get(TRIP_GET_BY_ID.replace(":tripId", tripId), {
    headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
  });
  return result.data;
};

export const getAllTripAnalyticData = async (imei, tripId) => {
  const result = await vtsApi.get(
    TRIP_GET_ALL_ANAYLTICS_DATA.replace(":imei", imei).replace(
      ":tripId",
      tripId
    ),
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

export const getActiveTripsByAssetId = async (assetId, userId) => {
  const result = await api.get(
    GET_ACTIVE_TRIP_BY_ASSET_ID.replace(":assetId", assetId).replace(
      ":ownerId",
      userId
    ),
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
      baseURL: process.env.REACT_APP_ENZO_API_BASE_URL,
    }
  );
  return result.data;
};
