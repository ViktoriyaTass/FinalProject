var express = require("express");  
var app = express();  
var db = require("./database.js");
var fs = require('fs');
global.nameFileText;
global.nameFileWords;
global.lengthOfTheWords;
global.errorThresholds;
global.speed;

const path = require("path");
const upload=require("express-fileupload");
const PORT=process.env.PORT||8080;
const P= "C:/Users/galbu/Desktop/FFF/upload/input.json"
app.use(upload());
app.use(express.static("public"));

	app.get("/CheckUser", function(req, res){

		var {email, password} = req.query;

		db.data(email, password, function(result){
			res.send(JSON.stringify({res : result}));
		})
		
	});

	app.get("/AddUser",function(req,res){
		var{email,password}=req.query;
		db.add(email,password,function(result){
			res.send(
				JSON.stringify({res:result}));

		})

	});


	app.get("/AddParrameters",function(req,res){
		var{lengthOfTheWords,errorThresholds,speed}=req.query;
		console.log(lengthOfTheWords+errorThresholds+speed);
		global.lengthOfTheWords=lengthOfTheWords;
		global.errorThresholds=errorThresholds;
		global.speed=speed;
		



	});

app.get("/start",function(req,res){

	var data={
		ErrorThresholds:global.errorThresholds,
		lengthOfTheWords:global.lengthOfTheWords,
		nameFileText:global.nameFileText,
		nameFileWords:global.nameFileWords,
		Speed:global.speed
	}

		let jsonName="input.json"
		const jData=JSON.stringify(data);
		fs.writeFile(P,jData, (err) => {
			if (err) {
			  console.error('Error creating file:', err);
			} else {
			  console.log('File created successfully!');
			}
		  });



})





	app.get('/file-upload1',(req,res)=>{
		console.log("GET");
		res.sendFile(_dirname+'mainWindow.html')

	})
	app.post('/file-upload1',(req,res)=>{
		
		if(req.files){
		let file=req.files.file;
		let filename= file.name;
		console.log(filename);
		nameFileText=filename;
		file.mv('C:/Users/galbu/Desktop/FFF/upload/'+filename,(err)=>{
			if(err) throw err;
		})
		}
		console.log("file uploaded");
		
		// //let jsonName="input.json"
		// var obj = {name : 'john'};
		// const jData=JSON.stringify(obj);
		// fs.writeFile(P,jData, (err) => {
		// 	if (err) {
		// 	  console.error('Error creating file:', err);
		// 	} else {
		// 	  console.log('File created successfully!');
		// 	}
		//   });
		//   	console.log("create json");



		// 	fs.readFile(P, 'utf8', function(err, data){
		// 		if (err) {
		// 			console.error('Error writing JSON file:', err);
		// 		  } 
		// 	// Display the file content
		// 	console.log(data);
		// 	var obj = data+{name : 'fill'} 
		// 	let jsonData = JSON.parse(data);
		// 	console.log("11"+data);
		// 	;////////////////////////////////////////////////// need change a add data to json
		// 	const jsonString = JSON.stringify(obj);
		// 	fs.writeFile(P, jsonString, (err) => {
		// 		if (err) {
		// 		  console.error('Error writing JSON file:', err);
		// 		} else {
		// 		  console.log('Data uploaded to JSON file successfully!');
		// 		}
		// 	  });
			//   var obj2 = {name : 'fill'} ;
			//   const jsonString2 = JSON.stringify(obj);
			//   fs.writeFile('C:/Users/galbu/Desktop/FFF/upload/'+jsonName, jsonString2, (err) => {
			// 	  if (err) {
			// 		console.error('Error writing JSON file:', err);
			// 	  } else {
			// 		console.log('Data uploaded to JSON file successfully!');
			// 	  }
			// 	});
			//});


	})

	app.get('/file-upload2',(req,res)=>{
		console.log("GET");
		res.sendFile(_dirname+'mainWindow.html')

	})
	app.post('/file-upload2',(req,res)=>{
		console.log("123")
		if(req.files){
		let file=req.files.file;
		let filename= file.name;
		console.log(filename);
		nameFileWords=filename;
		file.mv('C:/Users/galbu/Desktop/FFF/upload/'+filename,(err)=>{
			if(err) throw err;
		})
		}
	})


	

// app.get("/index2", function(req, res){
// 	res.sendFile(__dirname + "/public/html/index2.html");
// })


// app.get("/index", function(req, res){
// 	res.sendFile(__dirname + "/public/html/index.html");
// })




if (app.listen(8080)){
	console.log("listening on 8080");
}