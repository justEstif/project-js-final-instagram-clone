import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import * as ROUTES from "../constants/routes";
import FirebaseContext from "../context/firebase";
import { doesUsernameExist } from "../services/firebase";
import { addDoc, collection } from "firebase/firestore";
export default function SignUp() {
  const navigate = useNavigate(); // naviagate to diff page on login

  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState(""); // user signup info
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const [error, setError] = useState(""); // if user provides wrong email || pw
  const isInvalid = password === "" || emailAddress === "";

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const usernameExists = await doesUsernameExist(username);
      // ! if a user doesn't exist
      if (!usernameExists) {
        await createUserWithEmailAndPassword(auth, emailAddress, password);
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
        await addDoc(collection(db, "users"), {
          userId: auth.currentUser.uid,
          username: username.toLowerCase(),
          fullName: fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });
        navigate(ROUTES.DASHBOARD);
      } else {
        setError("That username is already take, please try another.");
      }
    } catch (error) {
      setError(error.message);
      setUsername("");
      setFullName("");
      setEmailAddress("");
      setPassword("");
    }
  };

  useEffect(() => {
    document.title = "Signup - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram"
        />
      </div>
      <div className="flex flex-col w-2/5 ">
        <div className="flex flex-col items-center bg-white p-4 rounded border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="instagram"
              className="my-2 w-6/12"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={(e) => handleSignup(e)} method="post">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium w-full rounded h-8 font-bold text-white
              ${isInvalid && "opacity-50"}`}>
              Signup
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}