import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
export default function Login(params) {
  const navigate = useNavigate(); // naviagate to diff page on login

  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState(""); // user signup info
  const [password, setPassword] = useState("");

  const [error, setError] = useState(""); // if user provides wrong email || pw
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = () => {};

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <p>I will be the form</p>
      </div>
    </div>
  );
}
