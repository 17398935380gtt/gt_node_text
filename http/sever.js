
const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');

    const data=[
        {index:0,context:"hello 0"},
        {index:1,context:"hello 1"},
        {index:2,context:"hello 2"},
    ];

let server = http.createServer(function (request, response) {
    const parsedUrl = url.parse(request.url);
    if (parsedUrl.pathname === '/favicon.ico') {
        // 如果请求url是浏览器icon，比如 http://localhost:3000/favicon.ico的情况
        // 就返回一个200就好了
        response.writeHead(200);
        response.end();
        return;
    }
    if (parsedUrl.pathname === '/data') {
        //如果是请求数据则返回数据
        response.writeHead(200);
        response.end(JSON.stringify(data));
        return;
    }
    // 如果访问的是根路径，则把游戏页面读出来返回出去
    if (parsedUrl.pathname === '/') {
        fs.createReadStream(__dirname + '/index.html').pipe(response);
    }
});

server.listen(3000);
console.log('Server running at http://127.0.0.1:8080/');
