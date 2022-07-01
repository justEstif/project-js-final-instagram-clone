import { firebase, FieldValue } from "../lib/firebase";
import { db } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function doesUsernameExist(username) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.length > 0;
}
