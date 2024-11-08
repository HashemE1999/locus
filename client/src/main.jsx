import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Login from "./components/LoginForm.jsx";
import Signup from "./components/SignupForm.jsx";
import PointsOfInterest from "./components/PointsOfInterest.jsx";
import ExistTrips from "./pages/ExistTrips";
import TripCreator from "./pages/TripCreator.jsx";
//Need to route for the home element

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <h1>Something went wrong!</h1>,
    children: [
      {
        index: true,
        element: <h1>Welcome to Locus!</h1>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/pointsofinterest",
        element: <PointsOfInterest />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/mytrips",
        element: <ExistTrips />,
      },
      {
        path: "/creator",
        element: <TripCreator />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
