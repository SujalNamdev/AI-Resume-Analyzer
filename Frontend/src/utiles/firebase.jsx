
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgTzTYlGMsJ-ElkUSi8qVovgmQe4Txnpo",
  authDomain: "mernairesumechecker.firebaseapp.com",
  projectId: "mernairesumechecker",
  storageBucket: "mernairesumechecker.firebasestorage.app",
  messagingSenderId: "769854706519",
  appId: "1:769854706519:web:4ba449755169236b42a412",
  measurementId: "G-P084K6FT3R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export {auth, provider};