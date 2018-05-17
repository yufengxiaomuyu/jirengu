var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

http.createServer(function(req,res){
	var pathObj = url.parse(req.url,true);
	if (pathObj.pathname === "/") pathObj.pathname += "index.html";
	console.log(pathObj);
	
	switch (pathObj.pathname) {
        case "/loadMore":
            setTimeout(function(){
            	var index = pathObj.query.index;
			    var len = pathObj.query.len;
			    console.log(len);
			    var data = [];
			    for (i = 0;i < len;i++) {
			    	data.push("新闻" + (parseInt(index) + i));
			    }
			    res.end(JSON.stringify(data));
            },2000);
		    
        	break;
        default:
            fs.readFile(path.join(__dirname,"static",pathObj.pathname),function(err,data){
                if (err) {
                	res.statusCode = 404;
                	res.end("Not found");
                } else {
                	res.end(data);
                }
            });
	};
}).listen(8080);