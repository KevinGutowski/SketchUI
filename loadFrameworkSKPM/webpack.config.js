module.exports = {
  test: /\.(xib|nib)$/,
  use: [
    {
      loader: '@skpm/nib-loader',
      options: {}
    }
  ]
}
