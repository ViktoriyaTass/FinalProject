var express = require("express");  
var app = express();  
var db = require("./database.js");

app.use(express.static("public"));

app.get("/CheckUser", function(req, res){

	var {email, password} = req.query;

	db.data(email, password, function(result){
		res.send(JSON.stringify({res : result}));
	})
	
});

// app.get("/index2", function(req, res){
// 	res.sendFile(__dirname + "/public/html/index2.html");
// })


// app.get("/index", function(req, res){
// 	res.sendFile(__dirname + "/public/html/index.html");
// })




if (app.listen(8080)){
	console.log("listening on 8080");
}