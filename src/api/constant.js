/** USER APIs */
const USER_API_BASE_URL = "/user/meta";
export const USER_SIGN_UP = `${USER_API_BASE_URL}/signup`;
export const USER_LOGIN = `${USER_API_BASE_URL}/login`;
export const USER_GET_PROFILE = `${USER_API_BASE_URL}/getUserMetaData/id/:userId`;
export const USER_UPDATE_PROFILE = `${USER_API_BASE_URL}/update`;
export const USER_UPDATE_PREFERENCES = `/fleet/alerts/addOrUpdate`;

/** ASSET APIs */
const ASSET_API_BASE_URL = "/asset/meta";
export const ASSET_ADD = `${ASSET_API_BASE_URL}/:userId/add`;
export const ASSET_UPDATE = `${ASSET_API_BASE_URL}/:userId/update`;
export const ASSET_GET_ALL = `${ASSET_API_BASE_URL}/getAllAssets/user/:userId`;
export const ASSET_GET_BY_ID = `${ASSET_API_BASE_URL}/getAssetMetaData/asset/:userId/:assetId`;
export const ASSET_GET_CURRENT_DRIVER_MAP = `/asset/driver/map/currentMap/:userId/:assetId`;
export const ASSET_GET_CURRENT_DATA = `/vts/master/:assetId/getCurrentData`;
export const ASSET_GET_EVENTS = `/events/data/getEvents/asset/:assetId`;
export const ASSET_GET_LOCATIONS = `/asset/location/:imei/getLocations/:startTime/:endTime`;
export const GET_LIVE_DATA_ASSET = `/live/data/get/asset/:assetId`;

/** FILE API */
const FILE_API_BASE_URL = "/fileService";
export const FILE_UPLOAD_ASSET_IMAGE = `${FILE_API_BASE_URL}/add/asset/:userId/:regNo/:name`;
export const FILE_GET_ASSET_IMAGE = `${process.env.REACT_APP_ASSET_IMAGE_URL}/:userId/:regNo/:name`;

/** Driver APIs */
const DRIVER_API_BASE_URL = "/driver/meta";
export const DRIVER_ADD = `${DRIVER_API_BASE_URL}/:userId/add`;
export const DRIVER_UPDATE = `${DRIVER_API_BASE_URL}/:userId/update`;
export const DRIVER_GET_ALL = `${DRIVER_API_BASE_URL}/getAll/owner/:userId`;
export const DRIVER_GET_BY_ID = `${DRIVER_API_BASE_URL}/getData/driver/:userId/:driverId`;
export const DRIVER_ASSIGN_TO_ASSET = `/asset/driver/map/:userId/assign/:assetId/:driverId`;
export const DRIVER_GET_ALL_UNASSIGNED = `/asset/driver/map/getAll/unAssigned/:userId`;
export const DRIVER_UNASSIGNED = `/asset/driver/map/unAssign/driver/:userId/:assetId`;

/**Trip APIs */
const TRIP_API_BASE_URL = "/trip/meta";
export const TRIP_ADD = `${TRIP_API_BASE_URL}/addTrip`;
export const TRIP_UPDATE = `${TRIP_API_BASE_URL}/updateTrip`;
export const TRIP_GET_ALL = `${TRIP_API_BASE_URL}/getAllTrips/owner/:userId`;
export const TRIP_GET_BY_ID = `${TRIP_API_BASE_URL}/getTrip/:tripId`;
export const TRIP_GET_ALL_ANAYLTICS_DATA = `/trips/analytics/getDataByAssetId/:assetId`;
export const GET_TRIP_DATA_BY_TRIP_ID = `/trips/analytics/getDataByTripId/:tripId`;
