import FirebaseContext from "../context/firebase";
import { useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function DoesUsernameExist(username) {
  const {
    firebase: { db },
  } = useContext(FirebaseContext);
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0; // return true if some doc exists
}
