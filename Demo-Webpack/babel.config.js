module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'defaults',
        modules: false,
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
}
