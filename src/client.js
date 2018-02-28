var net = require('net');   //引入网络模块
var HOST = '127.0.0.1';     //定义服务器地址
var PORT = 12345;            //定义端口号

//创建一个TCP客户端实例
var client = net.connect(PORT, HOST, function() {
    console.log('Connected to the server.');
    client.write('Forrest\r\n');
});

//监听数据传输事件
client.on('data', function(data) {
    console.log(data.toString());
    console.log();
    client.end();
});

//监听连接关闭事件
client.on('end', function() {
    console.log('Server disconnected.');
    console.log();
});