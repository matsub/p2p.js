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
    this._candidates = []
    this._onCall = false
    this.peerId = getUUID()
    this.ref = firebase.database().ref(`/${process.env.FIREBASE_REFERENCE}`)
    this._firebase = firebase
    this._uid = this._send({
      peerId: this.peerId,
      onCall: false
    }).key

    this.sby4call()
  }

  async sby4call () {
    this.ref.on("child_changed", snapshot => {
      const received = snapshot.val()
      if (received.onCall === this.peerId && this._onCall === false) {
        this._onCall = true
        this.call(received.peerId)
        this._negotiate(received)
      }
    })

    this._channel = this._pc.createDataChannel("backstreet")
    this._pc.onicecandidate = event => {
      this._candidates.push(event.candidate)
      this._update("candidates", this._candidates)
    }

    const offer = await this._pc.createOffer()
    this._pc.setLocalDescription(offer)
    this._update("offer", offer)
  }

  call (peerId) {
    this._onCall = true
    this._update("onCall", peerId)
  }

  _negotiate () {
  }

  _send (payload) {
    return this.ref.push(payload)
  }

  _update (childName, payload) {
    this.ref.child(this._uid).child(childName).set(payload)
  }

  _recv () {
    return new Promise(res => {
      this.ref.on("child_added", snapshot => {
        let received = snapshot.val()
        if (received.peerId === this.peerId) {
          res(received)
        }
      })
    })
  }
}


export default Peer
