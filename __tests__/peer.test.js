import Peer from "../src/peer.js"

describe('firebaseにpeerIDを登録する', () => {
  let peer = null

  beforeEach(async () => {
    peer = new Peer()
    await peer.ref.remove()
  })

  test('firebaseに飛ばされたデータをcallbackで受け取れる', done => {
    let origin = { message: "hello" }

    peer.send(origin)
    peer.on("recv", received => {
      expect(received).toMatchObject(origin)
      done()
    })
  })

  test('firebaseの受信をawaitで待てる', async () => {
    let origin = { message: "yayay" }

    peer.send(origin)
    let received = await peer.triggered("recv")
    expect(received).toMatchObject(origin)
  })
})
