import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";
import { onAuthStateChanged } from "firebase/auth";

const useAuthListener = () => {
  // go through the state, and set the user
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  const {
    firebase: { auth },
  } = useContext(FirebaseContext);
  useEffect(() => {
    // when there is an auth change
    const listener = onAuthStateChanged(auth, (authUser) => {
      // if we have a user -> we can store the user in Local storagee
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // if there is a logout -> remove the user item
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });
    // clean
    return () => listener();
  }, [auth]);
  return { user };
};

export default useAuthListener;
