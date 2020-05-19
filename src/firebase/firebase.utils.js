import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyA6eGHKD4HoWcgZQ59_nyx16h1Uvk_tous",
  authDomain: "uncltr-notes.firebaseapp.com",
  databaseURL: "https://uncltr-notes.firebaseio.com",
  projectId: "uncltr-notes",
  storageBucket: "uncltr-notes.appspot.com",
  messagingSenderId: "935252998639",
  appId: "1:935252998639:web:f16cf411d995e75fbc5e1a",
  measurementId: "G-T1TEP2XGG6",
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
    if (displayName) {
      var welcomeNote = {
        title: `Hi ${displayName}, welcome to Uncltr!`,
        text: `<p>We are excited that you've chosen <strong><em>UNCLTR</em></strong> to journal your genius thoughts!</p><p><br></p><p>Here's just a few things to know before you get started:</p><p><br></p><p><strong>Quick tips:</strong></p><p>-- Your notes are safe and secure on your account, and you can access them from any platform (at <a href="https://uncltr-notes.web.app/" rel="noopener noreferrer" target="_blank"><strong><em>uncltr-notes.web.app</em></strong></a>)</p><p>-- Styles and formatting are saved as well</p><p>-- Notes can be re-ordered as you please, except for the current note being edited</p><p>[To move a note, simply hover over it with a mouse (for desktops) or press and hold if on a mobile device]</p><p>-- To create a new button, simply click on the "Add-note" icon in the notes column</p><p>-- Similarly, you can delete any note by clicking on the "trash can" icon beside it</p><p>-- You can also easily search for notes by the title, text or date of last edit by typing in the search bar</p><p>-- Finally, the world (this quill, really) is your oyster... go crazy!</p>`,
        date: new Date().toString(),
        orderNum: 20.2,
      };
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
        });
        await addNote(userAuth.uid, 20.2, welcomeNote); //first note on each account has an order number of 5.05
      } catch (e) {
        console.log("error: ", e.message);
      }
    }
  } else {
  }

  return userRef;
};

export const updateNote = async (noteObj, userID) => {
  firestore
    .collection("users")
    .doc(userID)
    .collection("notes")
    .doc(noteObj.id)
    .update({
      title: noteObj.title,
      text: noteObj.text,
      date: new Date().toString(),
      orderNum: noteObj.orderNum,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const addNote = async (userID, orderNum, noteObj) => {
  console.log("add new note called");
  var newItem;
  console.log("note obj add: ", noteObj);
  noteObj
    ? (newItem = noteObj)
    : (newItem = {
        title: "New note",
        text: "<p>Text goes here</p>",
        date: new Date().toString(),
        orderNum: orderNum / 2,
      });
  const newFromDB = await firestore
    .collection("users")
    .doc(userID)
    .collection("notes")
    .add({
      title: newItem.title,
      text: newItem.text,
      date: newItem.date,
      orderNum: newItem.orderNum,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  newItem.id = newFromDB.id;
  return newItem;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
