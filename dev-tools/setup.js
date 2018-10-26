class mockRTCPeerConnection {
  createOffer () {
    return new Promise(resolve => {
      resolve({sdp: "sdppppp", type: "offer"})
    })
  }

  setLocalDescription () {
  }

  createDataChannel () {
    return new RTCDataChannel()
  }

  wakeCandidateEvent () {
    this.onicecandidate({ candidate: new RTCIceCandidate() })
  }
}

class mockRTCDataChannel {
}

class mockRTCIceCandidate {
  constructor () {
    this.candidate = "nope"
  }
}

global.RTCPeerConnection = mockRTCPeerConnection
global.RTCDataChannel = mockRTCDataChannel
global.RTCIceCandidate = mockRTCIceCandidate
