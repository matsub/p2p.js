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

function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

class Peer {
  constructor() {
    this.peerId = getUUID()
    this.ref = firebase.database().ref(`/${process.env.FIREBASE_REFERENCE}`)
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
