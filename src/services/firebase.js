import { firebase } from "../lib/firebase";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
const { db } = firebase;

export async function doesUsernameExist(username) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username.toLowerCase()));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0; // return true if some doc exists
}

export async function getUserByUserId(userId) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const user = querySnapshot.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const usersRef = collection(db, "users");
  const resultDoc = await getDocs(usersRef, limit(10));

  return resultDoc.docs
    .map((item) => ({
      ...item.data(),
      docId: item.id,
    }))
    .filter(
      (item) => item.userId !== userId && !following.includes(item.userId)
    );
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  const followerDocRef = doc(db, "users", loggedInUserDocId);
  return updateDoc(followerDocRef, {
    following: isFollowingProfile
      ? arrayRemove(profileId)
      : arrayUnion(profileId),
  });
}

export async function updateFollowedUserFollowers(
  profileDocId,
  userId,
  isFollowerProfile
) {
  const followedDocRef = doc(db, "users", profileDocId);
  return updateDoc(followedDocRef, {
    followers: isFollowerProfile ? arrayRemove(userId) : arrayUnion(userId),
  });
}

export async function getPhotos(userId, following) {
  const photosRef = collection(db, "photos");
  const queryUserId = query(photosRef, where("userId", "in", following));
  const querySnapshot = await getDocs(queryUserId);
  const userFollowedPhotos = querySnapshot.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}
