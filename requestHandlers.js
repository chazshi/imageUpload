var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
var iconv = require('iconv-lite');	//转换编码，解决utf-8和gbk编码转换问题（菱形问号，锟斤拷）


// //4.处理监听请求
// function start(response, request){
// 	console.log("'start'请求处理...");
	 
// 	// //单文本框
// 	// var body =  '<html>'+
// 	// 			'<head>'+
// 	// 			'<meta http-equiv="Content-Type" content="text/html; '+'charset=utf-8" />'+
// 	// 			'</head>'+
// 	// 			'<body>'+
// 	// 			'<form action="/upload" method="post">'+
// 	// 			'<textarea name="text" rows="20" cols="60"></textarea>'+
// 	// 			'<input type="submit" value="提交" />'+
// 	// 			'</form>'+
// 	// 			'</body>'+
// 	// 			'</html>';
	
// 	//图片上传框
// 	var body = 	'<html>'+
// 				'<head>'+'<meta http-equiv="Content-Type" '+
// 				'content="text/html; charset=UTF-8" />'+
// 				'</head>'+
// 				'<body>'+
// 				'<form action="/upload" enctype="multipart/form-data" '+
// 				'method="post">'+
// 				'<input type="file" name="upload">'+
// 				'<input type="submit" value="上传文件(jpg)" />'+
// 				'</form>'+
// 				'</body>'+
// 				'</html>';

// 	response.writeHead(200, {"Content-Type":"text/html;charset=UTF-8"});
// 	response.write(body);
// 	response.end();
// }

function upload(response, request){
	console.log("'upload'请求处理...");

	var form = new formidable.IncomingForm();
	console.log("正在处理upload信息...")
	form.parse(request, function(error, fields, files){
		console.log("处理upload信息完毕.");
		fs.renameSync(files.upload.path, "tmp\\test12345.jpg");	//存储的名字，最好避免重复的覆盖了
		response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
		response.write("收到图片：<br/>");
		response.write("<img src='/show'/>");
		response.end();
	});

	
}

function show(response, request){
	console.log("'show'请求处理...");
	//硬编码显示本地文件
	fs.readFile("tmp\\test12345.jpg", "binary", function(error, file){
		if(error){
			response.writeHead(500, {"Content-Type":"text/plain;charset=utf-8"});
			response.write(error + "\n");
			response.end();
		} else {
			//console.log(file);
			response.writeHead(200, {"Content-Type":"image/jpg"});
			response.write(file, "binary");
			response.end();
		}
	});
}

// //测试错误的非阻塞操作exec//结果：返回empty
// var exec = require("child_process").exec;
// function start(){
// 	//4.处理监听请求
// 	console.log("4.Request handle 'start' was called");
// 	var content = "empty";
// 	exec("dir", function(error, stdout, stderr){
// 		content = stdout;
// 		console.log("5." + content);
// 	});
// 	return content;
// }

//测试非阻塞操作//###这里timeout: 10000好像没用
function start(response){
	console.log("4.start handle");
	//4.处理监听请求
	exec("dir", { encoding: 'binary', timeout: 10000, maxBuffer: 20000*1024}, function(error, stdout, stderr){
		var encoding = 'gbk';	////或者'cp936'，cp936是gbk的内码表
		var binaryEncoding = 'binary';
		var str = iconv.decode(new Buffer(stdout, binaryEncoding), encoding);
		response.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
		response.write(str);
		response.end();
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;