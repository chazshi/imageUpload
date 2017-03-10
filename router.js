function route(handle, pathname, response, request){
	//3.路由监听请求
	console.log("正在路由请求： " + pathname);
	if(typeof handle[pathname] === 'function') {
		handle[pathname](response, request);
	} else {
		console.log("没有找到请求处理方法： " + pathname);
		response.writeHead(404, {"Content-Type":"text/plain;charset=UTF-8"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;