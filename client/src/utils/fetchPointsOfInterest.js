import axios from "axios";
import getAmadeusToken from "./getAmadeusToken";

const fetchPointsOfInterest = async (latitude, longitude, radius = 2) => {
  const token = await getAmadeusToken();

  if (!token) {
    console.error("Failed to retrieve Amadeus token");
    return null;
  }

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_AMADEUS_POI_URL}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          latitude: latitude,
          longitude: longitude,
          radius: radius,
        },
      }
    );

    return response.data.data; // Return only the points of interest data
  } catch (error) {
    console.error("Error fetching points of interest:", error);
    return null;
  }
};

export default fetchPointsOfInterest;
