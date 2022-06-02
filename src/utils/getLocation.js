export const getLocation = async (lat, lng) => {
  const geocoder = new window.google.maps.Geocoder();
  const request = { latLng: { lat: Number(lat), lng: Number(lng) } };
  const { results } = await geocoder.geocode(request);
  let returnValue = "";
  if (results && results[0]) {
    let adrs_comp = results[0].address_components;
    let loc_name;
    let area_name;
    for (let i = 0; i < adrs_comp.length; i++) {
      if (adrs_comp[i].types[0] === "locality") {
        loc_name = adrs_comp[i].long_name;
      }
      if (adrs_comp[i].types[0] === "administrative_area_level_1") {
        area_name = adrs_comp[i].long_name;
      }
    }
    returnValue = `${loc_name}, ${area_name}`;
  } else {
    returnValue = "";
  }
  return returnValue;
};
