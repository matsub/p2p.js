import Peer from "../src/peer.js"

describe('実際の接続前にdatachannel作っておいてicecandidate集めておく', () => {
  test('new Peer時にRTCPeerConnectionを生成している', () => {
    const peer = new Peer()

    expect(peer._pc).toBeInstanceOf(RTCPeerConnection)
  })
})
