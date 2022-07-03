import { useContext, Fragment } from "react";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";
import { getImg } from "../helpers/header";
const Header = () => {
  // importing context
  const {
    firebase: { auth },
  } = useContext(FirebaseContext);

  const { user } = useContext(UserContext);
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center justify-center cursor-pointer">
            <h1 className="flex w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                {/* * instagram logo */}
                <img
                  src="/images/logo.png"
                  className="mt-2 w-6/12"
                  alt="instagram logo"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center justify-center">
            {user ? (
              // if active user
              <Fragment>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <button
                  title="Sign out"
                  type="button"
                  onKeyDown={({ key }) => key === "Enter" && signOut(auth)}
                  onClick={() => signOut(auth)}>
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={getImg(`/images/avatars/${user.displayName}.jpg`)}
                      alt={`${user.displayName} img`}
                    />
                  </Link>
                </div>
              </Fragment>
            ) : (
              // if user isn't logged in
              <Fragment>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8  flex items-center justify-center">
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className=" text-blue-medium font-bold text-sm rounded w-20 h-8">
                    Sign Up
                  </button>
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
