const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

//配置启动端口
module.exports = {
  devServer: {
    port: 10000,
    proxy: {
      '/api': {
        target: 'http://localhost:9090',
        changeOrigin: true, //是否改变请求源
        pathRewrite: { //重写请求路径
          '/api': ''
        }
      }
    }
  }
}
