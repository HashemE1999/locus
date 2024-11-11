import axios from "axios";

const getAmadeusToken = async () => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_AMADEUS_AUTH_URL,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: import.meta.env.VITE_AMADEUS_API_KEY,
        client_secret: import.meta.env.VITE_AMADEUS_API_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting Amadeus token:", error);
    return null;
  }
};

export default getAmadeusToken;
