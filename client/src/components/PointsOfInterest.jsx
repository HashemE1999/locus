// src/components/PointsOfInterest.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getAmadeusToken from '../utils/getAmadeusToken';
import AttractionCard from './AttractionCard';

const PointsOfInterest = () => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPointsOfInterest = async () => {
      setLoading(true);

      // Get the Amadeus access token
      const token = await getAmadeusToken();

      if (token) {
        try {
          // Fetch Points of Interest data using the token
          const response = await axios.get(process.env.REACT_APP_AMADEUS_POI_URL, {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              latitude: 41.397158, // Example latitude – Replace with User input
              longitude: 2.160873, // Example longitude – Replace with User input
              radius: 2, // Radius in kilometers - Should probably hardcode this one
            },
          });

          // Update attractions state with the data from the response
          setAttractions(response.data.data);
        } catch (error) {
          console.error('Error fetching points of interest:', error);
        }
      } else {
        console.error('Failed to retrieve access token');
      }

      setLoading(false);
    };

    fetchPointsOfInterest();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading attractions...</p>
      ) : (
        <div>
          {attractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PointsOfInterest;