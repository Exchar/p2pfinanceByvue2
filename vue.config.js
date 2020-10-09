module.exports = {
  devServer: {
    publicPath:
      process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
    proxy: {
      "/api": {
        target: "http://localhost:9999", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/api": "" //这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替
          //比如我要调用'http://40.00.100.133:3002/user/login'，直接写‘/api/user/login'即可
        }
      },
      "/markApi": {
        target: "http://5b8c1d3e930b.ngrok.io", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/markApi": "" //这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替
        }
      },
      "/testApi": {
        target: "http://bc7c7fffb669.ngrok.io", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/testApi": "" //这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替
        }
      }
    }
  }
};
