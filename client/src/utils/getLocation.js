export const getLocation = (city) => {
  return fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${
      import.meta.env.VITE_OPENWEATHER_API_KEY
    }`
  );
};

export const getPoints = (lat, lon) => {
  return fetch(
    `https://api.geoapify.com/v2/places?categories=tourism.sights&bias=proximity:${lon},${lat}&limit=8&apiKey=${
      import.meta.env.VITE_GEOAPIFY_KEY
    }`
  );
};
