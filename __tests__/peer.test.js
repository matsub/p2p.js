import Peer from "../src/peer.js"
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

// const peerRef = firebase.database().ref('/test')
// peerRef.on("child_added", snapshot => console.log(snapshot.val()))

async function clearTestData () {
  const peerRef = firebase.database().ref('/test')
  await peerRef.remove()
}

export default {
  clearTestData
}

describe('firebaseにpeerIDを登録する', () => {
  test('firebaseに飛ばされたデータを受け取れる', done => {
    let origin = { message: "hello" }
    let peer = new Peer()

    peer.send(origin)
    peer.on("recv", received => {
      expect(received).toBe(origin)
      done()
    })
  });
});
