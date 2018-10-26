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
      if (received.peerId === peer.peerId) {
        expect(received.onCall).toBe("now-calling")
        done()
      }
    })

    peer.call("now-calling")
  })

  test('自分がcallされるとpeer._negotiate が発火する', () => {
    const calling = new Peer()
    const called = new Peer()
    const negotiateSpy = jest.spyOn(called, "_negotiate")

    calling.call(called.peerId)

    expect(negotiateSpy).toBeCalled()
  })

  test('自分以外がcallされてもpeer._negotiateが発火しない', () => {
    const calling = new Peer()
    const called = new Peer()
    const uncalled = new Peer()

    const negotiateSpy = jest.spyOn(uncalled, "_negotiate")

    calling.call(called.peerId)

    expect(negotiateSpy).not.toBeCalled()
  })

  test('callするとpeer._onCallがtrueになる', () => {
    const calling = new Peer()
    const called = new Peer()

    calling.call(called.peerId)

    expect(calling._onCall).toBe(true)
  })

  test('callされるとpeer._onCallがtrueになる', () => {
    const calling = new Peer()
    const called = new Peer()

    calling.call(called.peerId)

    expect(called._onCall).toBe(true)
  })

  test('callされると呼んだpeerIdにonCall状態になる', done => {
    const calling = new Peer()
    const called = new Peer()

    called.ref.on("child_changed", snapshot => {
      let received = snapshot.val()
      if (received.peerId === called.peerId) {
        expect(received.onCall).toBe(calling.peerId)
        done()
      }
    })

    calling.call(called.peerId)
  })

  test('onCallだとpeer._negotiateが発火しない', () => {
    const calling = new Peer()
    const calling2 = new Peer()
    const called = new Peer()

    const negotiateSpy = jest.spyOn(called, "_negotiate")

    calling.call(called.peerId)
    calling2.call(called.peerId)

    expect(negotiateSpy).toHaveBeenCalledTimes(1)
  })

  afterAll(() => {
    peer._firebase.database().goOffline();
    peer._firebase.delete();
  })
})
