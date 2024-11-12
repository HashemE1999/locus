import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER_TRIPS } from "../utils/queries";
import AttractionCard from "../components/AttractionCard";
import { REMOVE_TRIP } from "../utils/mutations";
import { useState } from "react";

const ExistTrips = () => {
  const { loading, data } = useQuery(QUERY_USER_TRIPS);

  const [tripToDelete, setTripToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [removeTrip, { error }] = useMutation(REMOVE_TRIP, {
    refetchQueries: [QUERY_USER_TRIPS, "me"],
  });

  if (loading) return <p>Loading trips...</p>;

  const trips = data?.me?.trips || [];
  console.log(trips);

  const handleDeleteTrip = async () => {
    try {
      const { data } = removeTrip({
        variables: { tripId: tripToDelete },
      });
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleButtonClick = (tripId) => {
    setShowModal(true);
    setTripToDelete(tripId);
  };

  const formatDate = (dateInput) => {
    let newDate = new Date(dateInput);
    return newDate.toDateString();
  };

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-2xl font-semibold mb-4">My Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.length > 0 ? (
          trips.map((trip) => (
            <div key={trip._id} className="">
              <h1 className="text-2xl mb-2">
                Trip created on {formatDate(trip.created)}
              </h1>
              <div className="flex flex-row gap-x-4">
                <button
                  className="uppercase bg-red-300 p-1 rounded-md hover:bg-red-200"
                  onClick={() => handleButtonClick(trip._id)}
                >
                  Delete trip
                </button>
                <Link
                  to={`/trip/${trip._id}`}
                  className="uppercase bg-lighterGreen hover:bg-mint p-1 rounded-md"
                >
                  View details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No trips found.</p>
        )}
      </div>

      {/* Button to create a new trip */}
      <Link to="/creator">
        <button className="fixed z-10 bottom-6 right-6 bg-lighterGreen text-black hover:bg-mint p-3 rounded-full shadow-lg">
          Create New Trip
        </button>
      </Link>

      {showModal && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden z-50 text-center justify-center items-center w-full mx-auto my-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Delete trip?
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  This action cannot be undone!
                </p>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={handleDeleteTrip}
                  data-modal-hide="default-modal"
                  type="button"
                  className="text-black bg-lighterGreen hover:bg-mint focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Never mind
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExistTrips;
