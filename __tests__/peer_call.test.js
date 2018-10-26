import Peer from "../src/peer.js"

describe('呼び出しフラグonCallがあり、呼び出し状態を表す', () => {
  let peer = null

  beforeEach(async () => {
    peer = new Peer()
    await peer.ref.remove()
  })

  test('new Peer時にデフォルトfalseのonCallプロパティがある', async () => {
    const peer = new Peer()
    const received = await peer.triggered("recv")
    expect(received).toHaveProperty("onCall", false)
  })

  test('peerIdでcallすると、そのonCallが呼出中のpeerIdになる', async () => {
    const peer = new Peer()

    peer.call("now-calling")

    let received = await peer.triggered("recv")
    expect(received.onCall).toBe("now-calling")
  })
})
