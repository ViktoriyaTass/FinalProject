var express = require("express");  
var app = express();  

app.use(express.static("public"));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/html/home.html");
})

app.get("/index2", function(req, res){
	res.sendFile(__dirname + "/public/html/index2.html");
})


app.get("/index", function(req, res){
	res.sendFile(__dirname + "/public/html/index.html");
})




if (app.listen(8080)){
	console.log("listening on 8080");
}