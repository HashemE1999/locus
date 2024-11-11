import { ADD_ATTRACTION, REMOVE_ATTRACTION } from "./tripActions";

export const tripReducer = (currentTrip, action) => {
  switch (action.type) {
    case ADD_ATTRACTION:
      return [
        ...currentTrip,
        {
          day: action.day,
          name: action.name,
          attractionId: action.attractionId,
        },
      ];
    case REMOVE_ATTRACTION:
      return currentTrip.filter((t) => t.id !== action.id);
  }
};
