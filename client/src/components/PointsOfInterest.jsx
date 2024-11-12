// src/components/PointsOfInterest.js

import React, { useEffect, useState } from "react";
import AttractionCard from "./AttractionCard";
import fetchPointsOfInterest from "../utils/fetchPointsOfInterest";

const PointsOfInterest = () => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPoints = async () => {
      setLoading(true);

      const response = await fetchPointsOfInterest(41.8967, 12.4822);

      setLoading(false);
    };
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
