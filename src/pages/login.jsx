import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as ROUTES from "../constants/routes";
import FirebaseContext from "../context/firebase";
import { getLoginError } from "../utils/getLoginError";

const Login = () => {
  const navigate = useNavigate();

  const {
    firebase: { auth },
  } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      getLoginError(error.code);
    }
  };

  const handleAnonymousSignIn = async () => {
    setEmailAddress(import.meta.env.VITE_TESTEMAIL);
    setPassword(import.meta.env.VITE_TESTPW);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      getLoginError(error.code);
    }
  };

  useEffect(() => {
    document.title = "Login - Not-Instagram";
  }, []);

  return (
    <div className="container flex items-center mx-auto max-w-screen-md h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center p-4 mb-4 bg-white rounded border border-gray-primary">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="instagram"
              className="my-2 w-6/12"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={(e) => handleLogin(e)} method="post">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="py-5 px-4 mr-3 mb-2 w-full h-2 text-sm rounded border text-gray-base border-gray-primary"
              onChange={({ target: { value } }) => setEmailAddress(value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="py-5 px-4 mr-3 mb-2 w-full h-2 text-sm rounded border text-gray-base border-gray-primary"
              onChange={({ target: { value } }) => setPassword(value)}
              value={password}
            />
            <div className="flex flex-col gap-4">
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium w-full rounded h-8 font-bold text-white
              ${isInvalid && "opacity-50"}`}
              >
                Login
              </button>
              <button
                onClick={handleAnonymousSignIn}
                className={`bg-gray-base w-full rounded h-8 font-bold text-white`}
              >
                Anonymous Login
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center p-4 w-full bg-white rounded border border-gray-primary">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
