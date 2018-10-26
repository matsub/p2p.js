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


function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


class Peer {
  constructor() {
    this._pc = new RTCPeerConnection()
    this.peerId = getUUID()
    this.ref = firebase.database().ref(`/${process.env.FIREBASE_REFERENCE}`)
    this._firebase = firebase
    this._uid = this._send({
      peerId: this.peerId,
      onCall: false
    }).key

    this.sby4call()
  }

  sby4call () {
    this.ref.on("child_changed", snapshot => {
      const received = snapshot.val()
      if (received.onCall === this.peerId) {
        this._negotiate(received)
      }
    })

    this._channel = this._pc.createDataChannel("backstreet")
  }

  call (peerId) {
    this.ref.child(this._uid).child("onCall").set(peerId)
  }

  _negotiate () {
  }

  _send (payload) {
    return this.ref.push(payload)
  }

  _recv () {
    return new Promise(res => {
      this.ref.on("child_added", snapshot => {
        res(snapshot.val())
      })
    })
  }
}


export default Peer
