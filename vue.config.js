module.exports = {
    publicPath: "./",  // 相对路径
    devServer: {
        proxy: {
            '/api': {
               target: 'http://47.94.81.206:80', //API服务器的地址
               ws: true,  //代理websockets
               changeOrigin: true, // 虚拟的站点需要更管origin
               pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                   '^/api': ''
               },
            }
       },
    //    contentBase:path.join(_dirname,'src')
    }
}