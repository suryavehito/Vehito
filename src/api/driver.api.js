import api from "./vehitoFleetBaseAPI";
import {
  ADD_ID_IMAGE,
  ADD_LICENSE_IMAGE,
  ADD_PROFILE_IMAGE,
  DRIVER_ADD,
  DRIVER_GET_ALL,
  DRIVER_GET_ALL_UNASSIGNED,
  DRIVER_GET_BY_ID,
  DRIVER_UPDATE,
  FILE_UPLOAD_DRIVER_IMAGE,
  GET_ID_IMAGE,
  GET_LICENSE_IMAGE,
  GET_PROFILE_IMAGE,
} from "./constant";

export const addDriver = async (data) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.post(
    DRIVER_ADD.replace(":userId", userId),
    { ...data, ownerUniqueId: userId },
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result;
};

export const updateDriver = async (data) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.put(DRIVER_UPDATE.replace(":userId", userId), data, {
    headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
  });
  return result.data;
};

export const getAllDriver = async (data) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.get(DRIVER_GET_ALL.replace(":userId", userId), {
    headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
  });
  return result.data;
};

export const getAllUnassignedDriver = async () => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.get(
    DRIVER_GET_ALL_UNASSIGNED.replace(":userId", userId),
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const getDriverDetailById = async (driverId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.get(
    DRIVER_GET_BY_ID.replace(":userId", userId).replace(":driverId", driverId),
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const getDriverProfileImage = async (driverId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api
    .get(
      GET_PROFILE_IMAGE.replace(":loginId", userId).replace(":id", driverId),
      {
        headers: {
          "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken"),
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => {
      return response && response.status === 200
        ? Buffer.from(response.data, "binary").toString("base64")
        : null;
    });
  return result;
};

export const getDriverIdImage = async (driverId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api
    .get(GET_ID_IMAGE.replace(":loginId", userId).replace(":id", driverId), {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
      responseType: "arraybuffer",
    })
    .then((response) => {
      return response && response.status === 200
        ? Buffer.from(response.data, "binary").toString("base64")
        : null;
    });
  return result;
};

export const getLicenseImage = async (driverId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api
    .get(
      GET_LICENSE_IMAGE.replace(":loginId", userId).replace(":id", driverId),
      {
        headers: {
          "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken"),
        },
        responseType: "arraybuffer",
      }
    )
    .then((response) => {
      return response && response.status === 200
        ? Buffer.from(response.data, "binary").toString("base64")
        : null;
    });
  return result;
};

export const addIdImage = async (data, driverId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.post(
    ADD_ID_IMAGE.replace(":loginId", userId).replace(":driverId", driverId),
    data,
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const addProfileImage = async (data, driverId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.post(
    ADD_PROFILE_IMAGE.replace(":loginId", userId).replace(
      ":driverId",
      driverId
    ),
    data,
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};

export const addLicenseImage = async (data, driverId) => {
  const userId = sessionStorage.getItem("userId");
  const result = await api.post(
    ADD_LICENSE_IMAGE.replace(":loginId", userId).replace(
      ":driverId",
      driverId
    ),
    data,
    {
      headers: { "X-Vehito-Auth-Token": sessionStorage.getItem("issuedToken") },
    }
  );
  return result.data;
};
