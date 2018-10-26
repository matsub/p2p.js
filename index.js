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
peerRef.on("child_added", snapshot => {
  console.warn("added")
  console.log(snapshot)
})
peerRef.on("child_changed", snapshot => {
  console.warn("updated")
  console.log(snapshot)
})

var key = null
document.querySelector("#push").onclick = () => {
  key = peerRef.push({ message: "hello"}).key
}
document.querySelector("#update").onclick = () => peerRef.child(key).child("message").set("whoaaaaa")
