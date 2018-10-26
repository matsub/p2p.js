import Peer from "../src/peer.js"

describe('呼び出しフラグonCallがあり、呼び出し状態を表す', () => {
  let peer = null

  beforeEach(async () => {
    peer = new Peer()
    await peer.ref.remove()
  })

  test('new Peer時にデフォルトfalseのonCallプロパティがある', async () => {
    const peer = new Peer()
    const received = await peer._recv()
    expect(received).toHaveProperty("onCall", false)
  })

  test('peerIdでcallすると、そのonCallが呼出中のpeerIdになる', done => {
    const peer = new Peer()

    peer.ref.on("child_changed", snapshot => {
      let received = snapshot.val()
      expect(received.onCall).toBe("now-calling")
      done()
    })

    peer.call("now-calling")
  })

  afterAll(() => {
    peer._firebase.database().goOffline();
    peer._firebase.delete();
  })
})
