import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDKtz40DHZLniYCcBfWg3_fBLGxget5y1M",
  authDomain: "react-notes-b2f44.firebaseapp.com",
  databaseURL: "https://react-notes-b2f44.firebaseio.com",
  projectId: "react-notes-b2f44",
  storageBucket: "react-notes-b2f44.appspot.com",
  messagingSenderId: "317238611124",
  appId: "1:317238611124:web:53d1c43654c1f6b3451be1",
  measurementId: "G-5LDEDZ0HGM",
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const createUserProfileDocument = async (userAuth) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
      });
    } catch (e) {
      console.log("error: ", e.message);
    }
  } else {
  }

  return userRef;
};

export const getUserNotes = async (id) => {
  if (!id) {
    console.log("undefined id");
    return;
  }

  const snapshot = await firestore
    .collection("users")
    .doc(id)
    .collection("notes")
    .get();
  //   console.log("snap exists? ", snapshot);
  if (!snapshot.empty) {
    var notesArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return notesArray;
  } else {
    return [];
  }
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
