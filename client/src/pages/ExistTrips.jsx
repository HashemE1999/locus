import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_TRIPS } from "../utils/queries";
import AttractionCard from "../components/AttractionCard";
import { REMOVE_TRIP } from "../utils/mutations";

const ExistTrips = () => {
  const { loading, data } = useQuery(QUERY_USER_TRIPS);

  if (loading) return <p>Loading trips...</p>;

  const trips = data?.me?.trips || [];
  console.log(trips);

  const [removeTrip, { error }] = useMutation(REMOVE_TRIP, {
    refetchQueries: [QUERY_USER_TRIPS, "me"],
  });

  const handleDeleteTrip = async (tripId) => {
    try {
      const { data } = removeTrip({
        variables: { tripId },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-2xl font-semibold mb-4">My Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <div key={trip._id} className="">
              <h1 className="">Trip created on {trip.created}</h1>
              <div className="flex flex-row gap-x-4">
                <button
                  className="uppercase bg-red-300 p-1 rounded-md hover:bg-red-200"
                  onClick={() => handleDeleteTrip(trip._id)}
                >
                  Delete trip
                </button>
                <button className="uppercase bg-lighterGreen hover:bg-mint p-1 rounded-md">
                  Edit trip
                </button>
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
