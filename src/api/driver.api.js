import api from "./vehitoFleetBaseAPI";
import { DRIVER_ADD, DRIVER_GET_ALL, DRIVER_GET_ALL_UNASSIGNED, DRIVER_GET_BY_ID, DRIVER_UPDATE, FILE_UPLOAD_DRIVER_IMAGE } from "./constant";


export const addDriver = async (data) => {
    const userId = sessionStorage.getItem("userId");
    const result = await api.post(DRIVER_ADD.replace(':userId', userId), {...data, ownerUniqueId : userId}, {
        headers: { 'X-Vehito-Auth-Token': sessionStorage.getItem("issuedToken") }
    });
    return result.data;
};

export const updateDriver = async (data) => {
    const userId = sessionStorage.getItem("userId");
    const result = await api.put(DRIVER_UPDATE.replace(':userId', userId), data, {
        headers: { 'X-Vehito-Auth-Token': sessionStorage.getItem("issuedToken") }
    });
    return result.data;
};


export const getAllDriver = async (data) => {
    const userId = sessionStorage.getItem("userId");
    const result = await api.get(DRIVER_GET_ALL.replace(':userId', userId), {
        headers: { 'X-Vehito-Auth-Token': sessionStorage.getItem("issuedToken") }
    });
    return result.data;
};

export const getAllUnassignedDriver = async () => {
    const userId = sessionStorage.getItem("userId");
    const result = await api.get(DRIVER_GET_ALL_UNASSIGNED.replace(':userId', userId), {
        headers: { 'X-Vehito-Auth-Token': sessionStorage.getItem("issuedToken") }
    });
    return result.data;
}

export const getDriverDetailById = async (driverId) => {
    const userId = sessionStorage.getItem("userId");
    const result = await api.get(DRIVER_GET_BY_ID.replace(':userId', userId).replace(':driverId', driverId), {
        headers: { 'X-Vehito-Auth-Token': sessionStorage.getItem("issuedToken") }
    });
    return result.data;
};

