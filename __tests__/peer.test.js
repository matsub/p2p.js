import Peer from "../src/peer.js"

describe('firebaseにpeerIDを登録する', () => {
  let peer = null

  beforeEach(async () => {
    peer = new Peer()
    await peer.ref.remove()
  })

  test('firebaseに飛ばされたデータをcallbackで受け取れる', async () => {
    const origin = { message: "hello" }
    peer.send(origin)

    const onPromise = new Promise(res => peer.on("recv", res))
    const received = await onPromise

    expect(received).toMatchObject(origin)
  })

  test('firebaseの受信をawaitで待てる', async () => {
    const origin = { message: "yayay" }

    peer.send(origin)
    const received = await peer.triggered("recv")
    expect(received).toMatchObject(origin)
  })

  test('firebaseのRefは環境変数FIREBASE_REFERENCEによる', () => {
    expect(peer.ref.key).toBe(process.env.FIREBASE_REFERENCE)
  })

  afterAll(() => {
    peer._firebase.database().goOffline();
    peer._firebase.delete();
  })
})
