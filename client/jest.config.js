module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios|@mui/material|@mui/icons-material|@emotion/react|@emotion/styled).+\\.js$'
    ],
  };
  