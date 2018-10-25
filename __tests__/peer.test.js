import Peer from "../src/peer.js"

describe('firebaseにpeerIDを登録する', () => {
  test('firebaseに飛ばされたデータを受け取れる', done => {
    let origin = { message: "hello" }
    let peer = new Peer()

    peer.send(origin)
    peer.on("recv", received => {
      expect(received.message).toBe(origin.message)
      done()
    })
  });
});
