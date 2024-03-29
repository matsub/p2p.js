import Peer from "../src/peer.js"

// TODO: WebRTC APIのテストは書けていない。
// dev-tools/ にクソモックがある

describe('実際の接続前にdatachannel作っておいてicecandidate集めておく', () => {
  test('new Peer時にRTCPeerConnectionを生成している', () => {
    const peer = new Peer()

    expect(peer._pc).toBeInstanceOf(RTCPeerConnection)
  })

  test('new Peer時にdatachannelを作ってある', () => {
    const peer = new Peer()

    expect(peer._channel).toBeInstanceOf(RTCDataChannel)
  })

  test('icecandidate生成時にpeer._sendでRTCIceCandidate飛ばしてる', done => {
    const peer = new Peer()

    peer.ref.on("child_changed", snapshot => {
      let received = snapshot.val()
      if (received.peerId === peer.peerId) {
        expect(received).toHaveProperty("candidates")
        done()
      }
    })

    peer._pc.wakeCandidateEvent()
  })

  test('channel作った後にofferを作り、firebaseに入れておく', done => {
    const peer = new Peer()

    peer.ref.on("child_changed", snapshot => {
      let received = snapshot.val()
      if (received.peerId === peer.peerId) {
        expect(received).toHaveProperty("offer")
        done()
      }
    })
  })
})
