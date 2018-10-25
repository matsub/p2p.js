import firebase from "firebase/app"
import "firebase/database"

const config = {
  apiKey: "AIzaSyAW_YSxQY0UE-K5gXJQEbX32UIc0MCY5xs",
  authDomain: "matsub-net.firebaseapp.com",
  databaseURL: "https://matsub-net.firebaseio.com",
  projectId: "matsub-net",
  storageBucket: "matsub-net.appspot.com",
  messagingSenderId: "597835145286"
}
firebase.initializeApp(config)

const peerRef = firebase.database().ref('/test')
console.log(peerRef.key)
peerRef.on("child_added", snapshot => console.log(snapshot))

const button = document.querySelector("button")
button.onclick = () => peerRef.push({ message: "hello"})