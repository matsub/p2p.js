class Peer {
  send () {}

  on (event, callback) {
    callback(10)
  }
}

export default Peer
