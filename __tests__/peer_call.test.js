import Peer from "../src/peer.js"

describe('呼び出しフラグonCallがあり、呼び出し状態を表す', () => {
  test('new Peer時にデフォルトfalseのonCallプロパティがある', async () => {
    const peer = new Peer()
    const received = await peer.triggered("recv")
    expect(received).toHaveProperty("onCall", false)
  })
})
