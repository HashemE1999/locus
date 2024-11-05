import {
  SET_USER,
  LOGOUT_USER,
  ADD_TRIP,
  REMOVE_TRIP,
  ADD_ATTRACTION,
  REMOVE_ATTRACTION,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user, // Save user details in state
        token: action.payload.token, // Save token in state
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null, // Clear user
        token: null, // Clear token
      };
    case ADD_TRIP:
      return {
        ...state,
        trips: [...state.trips, action.payload],
      };
    case REMOVE_TRIP:
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== action.payload),
      };
    case ADD_ATTRACTION:
      return {
        ...state,
        trips: state.trips.map((trip) =>
          // For each trip in the trips array, check if it matches the tripId in the payload.
          trip.id === action.payload.tripId
            ? // If the trip matches, update the attractions array by adding the new attraction.
              {
                ...trip, // Spread the existing trip data to keep other properties.
                attractions: [...trip.attractions, action.payload.attraction], // Add the new attraction.
              }
            : // If the trip does not match, return it unchanged.
              trip
        ),
      };
    case REMOVE_ATTRACTION:
      return {
        ...state,
        trips: state.trips.map(
          (trip) =>
            // Find the trip that matches the tripId in the action payload
            trip.id === action.payload.tripId
              ? {
                  ...trip, // Keep the other trip properties
                  attractions: trip.attractions.filter(
                    // Filter out the attraction that matches the attractionId in the payload
                    (attraction) =>
                      attraction.id !== action.payload.attractionId
                  ),
                }
              : trip // Return the unchanged trip if the IDs don't match
        ),
      };

    default:
      return state;
  }
};
