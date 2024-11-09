module.exports = {
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    transformIgnorePatterns: [
      "node_modules/(?!react-leaflet)"
    ],
    // other configurations...
  };
  