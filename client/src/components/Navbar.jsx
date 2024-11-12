import { Link } from "react-router-dom";

import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div
          fluid
          className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
        >
          <div className="ml-auto d-flex">
            {/* if user is logged in show saved locations and logout */}
            {Auth.loggedIn() ? (
              <>
                <Link to="/mytrips">See Your Trips</Link>
                <nav onClick={Auth.logout}>Logout</nav>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavbar;
