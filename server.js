var http = require("http");
var url = require("url");

function start(route, handle){
	function onRequest(request, response){
		// var postData = "";
		var pathname = url.parse(request.url).pathname;

		if(pathname == "/favicon.ico"){
			//console.log("屏蔽/favicon.ico请求");
			return;
		}

		//2.收到监听请求
		console.log("\n收到 " + pathname + " 的请求.");

		//request.setEncoding("UTF-8");
		// request.addListener("data", function(postDataChunk){
		// 	postData += postDataChunk;
		// 	console.log("Received POST data chunk '" + postDataChunk + "'.");
		// });
		// request.addListener("end", function(){
		// 	route(handle, pathname, response, postData);
		// });

		route(handle, pathname, response, request);
		//直接把request不做处理地传递给route是不恰当的，最好是服务器处理程序，数据传递给路由

		// //response改到route里面去处理
		// response.writeHead(200, {"Content-Type":"text/plain"});
		// response.write("hello world!");
		// response.end();
	}

	//1.创建http服务器，并启动监听
	http.createServer(onRequest).listen(8888);	
	console.log("启动服务器，开启监听8888端口...");
}

exports.start = start;


// http.createServer(function(request, response){
// 	response.writeHead(200, {"Content-Type":"text/plain"});
// 	response.write("hello world!");
// 	response.end();
// }).listen(8888);