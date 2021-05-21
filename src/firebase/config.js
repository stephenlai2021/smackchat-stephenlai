import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBm9VXXj0pjKwkWrr4lJqsGrpBHkLUdRho",
  authDomain: "udemy-course-nextjs.firebaseapp.com",
  databaseURL: "https://udemy-course-nextjs-default-rtdb.firebaseio.com",
  projectId: "udemy-course-nextjs",
  storageBucket: "udemy-course-nextjs.appspot.com",
  messagingSenderId: "562793526418",
  appId: "1:562793526418:web:e1019ac3cb79070bd2a24b",
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { db, auth, timestamp }