import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER_TRIPS } from "../utils/queries";
import AttractionCard from "../components/AttractionCard";

const ExistTrips = () => {
  const { loading, error, data } = useQuery(QUERY_USER_TRIPS);

  if (loading) return <p>Loading trips...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);

  const trips = data?.me?.trips || [];

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-2xl font-semibold mb-4">My Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <div key={trip._id} className="p-4 border rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{trip.name}</h3>
              <div className="flex flex-wrap gap-4">
                {trip.attractions &&
                  trip.attractions.map((attraction) => (
                    <AttractionCard
                      key={attraction._id}
                      attraction={attraction}
                    />
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p>No trips found.</p>
        )}
      </div>

      {/* Button to create a new trip */}
      <Link to="/creator">
        <button className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg">
          Create New Trip
        </button>
      </Link>
    </div>
  );
};

export default ExistTrips;
