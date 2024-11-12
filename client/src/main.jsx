import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Login from "./components/LoginForm.jsx";
import Signup from "./components/SignupForm.jsx";
import PointsOfInterest from "./components/PointsOfInterest.jsx";
import ExistTrips from "./pages/ExistTrips";
import TripCreator from "./pages/TripCreator.jsx";
import Landing from "./pages/Landing.jsx";
import TripEditor from "./pages/TripEditor.jsx";
//Need to route for the home element

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <h1>Something went wrong!</h1>,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
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
      {
        path: "trip/:tripId",
        element: <TripEditor />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
