module.exports = {
  collectCoverageFrom: [
    "src/**/*.js" 
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    ".wercker"
  ],
  setupFiles: [
    "./dev-tools/setup.js"
  ]
}
