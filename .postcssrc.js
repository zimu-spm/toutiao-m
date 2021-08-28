module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') == -1 ? 75 : 37.5
      },
      propList: ['*'],
      exclude: 'github-markdown' // 配置不要转换的css资源
    }
  }
}
