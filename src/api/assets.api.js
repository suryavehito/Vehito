import api from "./vehitoFleetBaseAPI";
import enzoApi from "./vehitoEnzoBaseAPI";
import {
  ASSET_ADD,
  ASSET_GET_ALL,
  ASSET_GET_BY_ID,
  ASSET_GET_CURRENT_DATA,
  ASSET_GET_CURRENT_DRIVER_MAP,
  ASSET_GET_EVENTS,
  ASSET_GET_LOCATIONS,
  ASSET_UPDATE,
  DRIVER_ASSIGN_TO_ASSET,
  DRIVER_UNASSIGNED,
  FILE_GET_ASSET_IMAGE,
  FILE_UPLOAD_ASSET_IMAGE,
  GET_LIVE_DATA_ASSET,
} from "./constant";

export const addAsset = async (data) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.post(
    ASSET_ADD.replace(":userId", userId),
    { ...data, userId },
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const updateAsset = async (data) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.put(ASSET_UPDATE.replace(":userId", userId), data, {
    headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
  });
  return result.data;
};

export const getAllAsset = async (data) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.get(ASSET_GET_ALL.replace(":userId", userId), {
    headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
  });
  return result.data;
};

export const getAssetDetailById = async (assetId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.get(
    ASSET_GET_BY_ID.replace(":userId", userId).replace(":assetId", assetId),
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const uploadAssetImage = async (data, regNo, name) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.post(
    FILE_UPLOAD_ASSET_IMAGE.replace(":userId", userId)
      .replace(":regNo", regNo)
      .replace(":name", name),
    data,
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return {
    url: FILE_GET_ASSET_IMAGE.replace(":userId", userId)
      .replace(":regNo", regNo)
      .replace(":name", name),
  };
};

export const getCurrentDriverMap = async (assetId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.get(
    ASSET_GET_CURRENT_DRIVER_MAP.replace(":userId", userId).replace(
      ":assetId",
      assetId
    ),
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const assignDriverToAsset = async (assetId, driverId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.post(
    DRIVER_ASSIGN_TO_ASSET.replace(":userId", userId)
      .replace(":assetId", assetId)
      .replace(":driverId", driverId),
    {},
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const updateDriverToAsset = async (assetId, driverId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.put(
    DRIVER_ASSIGN_TO_ASSET.replace(":userId", userId)
      .replace(":assetId", assetId)
      .replace(":driverId", driverId),
    {},
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const unAssignDriverFromAsset = async (assetId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.post(
    DRIVER_UNASSIGNED.replace(":userId", userId).replace(":assetId", assetId),
    {},
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const getCurrentData = async (assetId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await enzoApi.get(
    ASSET_GET_CURRENT_DATA.replace(":assetId", assetId),
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const getEvents = async (assetId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await enzoApi.get(
    ASSET_GET_EVENTS.replace(":assetId", assetId),
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const getLocations = async (imei, startTime, endTime) => {
  const result = await enzoApi.get(
    ASSET_GET_LOCATIONS.replace(":imei", imei)
      .replace(":startTime", startTime)
      .replace(":endTime", endTime),
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const getLiveDataAsset = async (assetId) => {
  const result = await enzoApi.get(
    GET_LIVE_DATA_ASSET.replace(":assetId", assetId),
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};
