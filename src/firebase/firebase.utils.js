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
    if (displayName) {
      var welcomeNote = {
        title: `Hi ${displayName}, welcome to Uncltr!`,
        text: `<p>We are excited that you've chosen <strong><em>UNCLTR</em></strong> to journal your genius thoughts!</p><p><br></p><p>Here's just a few things to know before you get started:</p><p><strong>Quick tips:</strong></p><ul><li>Your notes are safe and secure on your account, and you can access them from any platform (at <a href="www.uncltr.github.io" rel="noopener noreferrer" target="_blank">www.uncltr.github.io</a>)</li><li>Styles and formatting are saved as well</li><li>To create a new button, simply click on the "Add-note" icon in the notes column</li><li>Similarly, you can delete any note by clicking on the "trash can" icon beside it, or on the "Delete" button above the editor</li><li>You can also easily search for notes by the title, text or date of last edit by typing in the search bar</li><li><br></li><li>Finally, the world (this quill, really) is your oyster... go crazy!</li></ul><p><br></p><p><br></p><p><br></p><p><br></p><p>Got a really important note? Open the note info bar and press the 'Pin to top' button to pin it to the top of the list.</p><p><br></p>`,
        date: new Date().toString(),
      };
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
        });
        addNote(userAuth.uid, welcomeNote);
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
      // timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
};

export const addNote = async (userID, noteObj) => {
  console.log("add new note called");
  var newItem;
  noteObj
    ? (newItem = noteObj)
    : (newItem = {
        title: "New note",
        text: "<p>Text goes here</p>",
        date: new Date().toString(),
      });
  const newFromDB = await firestore
    .collection("users")
    .doc(userID)
    .collection("notes")
    .add({
      title: newItem.title,
      text: newItem.text,
      date: newItem.date, //firebase.firestore.FieldValue.serverTimestamp(),
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
