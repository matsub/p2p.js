class mockRTCPeerConnection {
  createDataChannel () {
    return new RTCDataChannel()
  }
}

class mockRTCDataChannel {
}


global.RTCPeerConnection = mockRTCPeerConnection
global.RTCDataChannel = mockRTCDataChannel
