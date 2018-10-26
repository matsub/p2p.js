import Peer from "../src/peer.js"

describe('firebaseに投げたメッセージを拾える', () => {
  let peer = null

  beforeEach(async () => {
    peer = new Peer()
    await peer.ref.remove()
  })

  test('firebaseのRefは環境変数FIREBASE_REFERENCEによる', () => {
    expect(peer.ref.key).toBe(process.env.FIREBASE_REFERENCE)
  })

  afterAll(() => {
    peer._firebase.database().goOffline();
    peer._firebase.delete();
  })
})


describe('new Peer時にpeerを登録する', () => {
  let peer = null

  beforeEach(() => {
    jest.spyOn(Math, "random").mockReturnValue(0.5)
    peer = new Peer()
  })

  test('new Peer時にUUIDを生成する', () => {
    expect(peer.peerId).toEqual("88888888-8888-4888-8888-888888888888")
  })

  test('new PeerでpeerID(UUID)を持ったオブジェクトをストアする', async () => {
    const received = await peer._recv()
    expect(received).toHaveProperty("peerId", "88888888-8888-4888-8888-888888888888")
  })
})
