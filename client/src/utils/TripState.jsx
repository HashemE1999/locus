import { createContext, useContext, useReducer } from "react";
import { tripReducer } from "./tripReducers";

const TripContext = createContext();
const { Provider } = TripContext;

const TripProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(tripReducer, []);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useTripContext = () => {
  return useContext(TripContext);
};

export { TripProvider, useTripContext };
