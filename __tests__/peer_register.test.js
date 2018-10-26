import Peer from "../src/peer.js"

describe('firebaseに投げたメッセージを拾える', () => {
  test('firebaseのRefは環境変数FIREBASE_REFERENCEによる', () => {
    const peer = new Peer()
    expect(peer.ref.key).toBe(process.env.FIREBASE_REFERENCE)
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
