class Peer {
  send () {}

  on (event, callback) {
    callback({ message: "hello" })
  }
}

export default Peer
