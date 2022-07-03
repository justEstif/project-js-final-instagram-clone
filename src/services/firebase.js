import { firebase } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function doesUsernameExist(username) {
  const { db } = firebase;
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username.toLowerCase()));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0; // return true if some doc exists
}
