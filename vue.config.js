module.exports = {
  devServer: {
    publicPath:
      process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
    proxy: {
      [process.env.VUE_APP_TEST_API]: {
        target: process.env.VUE_APP_TEST_URL, //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_TEST_API]: "" //这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替
          //比如我要调用'http://40.00.100.133:3002/user/login'，直接写‘/api/user/login'即可
        }
      },
      "/markApi": {
        target: "http://39.97.101.196:8080", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/markApi": "" //这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替
        }
      },
      "/testApi": {
        target: "http://", //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          "^/testApi": "" //这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替
        }
      }
    }
  }
};
