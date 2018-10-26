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
})
