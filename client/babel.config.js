module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-private-property-in-object' 
  ],
  overrides: [
    {
      test: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
      plugins: [
        '@babel/plugin-transform-modules-commonjs'
      ]
    }
  ]
};
