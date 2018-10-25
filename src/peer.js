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


const EVENTS = {
  recv: "child_added"
}

class Peer {
  constructor() {
    this.ref = firebase.database().ref('/test')
    this._firebase = firebase
  }

  send (payload) {
    this.ref.push(payload)
  }

  triggered (event) {
    return new Promise(res => {
      this.ref.on(EVENTS[event], snapshot => {
        res(snapshot.val())
      })
    })
  }

  on (event, callback) {
    this.ref.on(EVENTS[event], snapshot => {
      callback(snapshot.val())
    })
  }
}

export default Peer
