var express = require("express");  
var app = express();  
var db = require("./database.js");
var fs = require('fs');
const e = require('child_process');
const path = require("path");
const upload=require("express-fileupload");

global.nameFileText;
global.nameFileWords;
global.lengthOfTheWords;
global.errorThresholds;
global.speed;// low/Hight speed
global.fileExist=0;
global.TimeStart=0;
global.sizeofFile=0;

const fileUn = 'C:/Users/Administrator/Documents/FinalProject/public/answer.txt'
const	PLM="C:/FinalProjectLowMachine/input.json"
const 	PHM="C:/FinalProjectMediumMachine/input.json"
const PathSaveFailesLM="C:/FinalProjectLowMachine/"
const PathSaveFailesHM="C:/FinalProjectMediumMachine/"
app.use(upload());
app.use(express.static("public"));

	app.get("/CheckUser", function(req, res){// check if this user exist in DB

		var {email, password} = req.query;

		db.data(email, password, function(result){
			res.send(JSON.stringify({res : result}));
		})
		
	});
	app.get("/costcheck", function(req, res){// checking the approximate cost of the using mashins 

		
			res.send(JSON.stringify({res : sizeofFile/1000}));// return size of file * 5
		
		
	});

	app.get("/checkFile", function(req, res){// check if file answer exist in boddy of progect 
		
			res.send(JSON.stringify({res : fileExist}));
			
	});

	app.get("/AddUser",function(req,res){// add user to DB
		var{email,password}=req.query;
		db.add(email,password,function(result){
			res.send(
				JSON.stringify({res:result}));

		})

	});


	app.get("/AddParrameters",function(req,res){// save vareables from HTML to global variebalse
		var{lengthOfTheWords,errorThresholds,speed}=req.query;
		console.log(lengthOfTheWords+errorThresholds+speed);
		global.lengthOfTheWords=lengthOfTheWords;
		global.errorThresholds=errorThresholds;
		global.speed=speed;
	});

app.get("/start",function(req,res){// start of the algorithm running
	TimeStart=new Date();// save start time 
	var data={// create json data
		ErrorThresholds:global.errorThresholds,
		lengthOfTheWords:global.lengthOfTheWords,
		nameFileText:global.nameFileText,
		nameFileWords:global.nameFileWords,
		Speed:global.speed
	}
		
		let jsonName="input.json"
		const jData=JSON.stringify(data); // save json file
		fs.writeFile(PLM,jData, (err) => {
			if (err) {
			  console.error('Error creating file:', err);
			} else {
			  console.log('File created successfully!');
			}
		  });
		fs.writeFile(PHM,jData, (err) => {
			if (err) {
			  console.error('Error creating file:', err);
			} else {
			  console.log('File created successfully!');
			}
		  })
			
			checkFileCount()
			
			

})

function checkFileCount() {
	var folderPath="";
if (speed=="low"){
	folderPath = PathSaveFailesLM;
}else{
	folderPath=PathSaveFailesHM;
}

	fs.readdir(folderPath, (err, files) => {// try to enter to the file folder
	  if (err) {
		//console.error('Ошибка чтения папки:', err);
		return;
	  }
	
	  const fileCount = files.length;
	  //console.log('Количество файлов в папке:', fileCount);
	  if (fileCount === 1) {// if the count of files=1
		  console.log('Количество файлов достигло 1');
		  	var TimeEnd= new Date();// end Time of running algorithm
			const fileName = files[0];
			const filePath = path.join(folderPath, fileName);
		
			fs.readFile(filePath, 'utf8', (err, data) => {// read file
			  if (err) {
				console.error('Ошибка чтения файла:', err);
				return;
			  }
				var Time= (TimeEnd-TimeStart)/1000;// time of using machines
			  console.log('Содержимое файла:', data);
			  fs.writeFile(fileUn,+"\n"+"Operation Time: "+ Time+"sec"+"\n"+ data , 'utf8', (err) => { //save file  with DATA from answer file and Time
				if (err) {
				  console.error('Ошибка создания файла:', err);
				  return;
				}
			  
				console.log('Файл успешно создан и сохранен в тело проекта.');
				fileExist=1;
			  });
			});
		  

		} else {
		  console.log('Ожидание изменения количества файлов...');// waiting  to change the number of files
		  setTimeout(checkFileCount, 1000); // check every 2 seconds
		}
	});

}





	app.get('/file-upload1',(req,res)=>{
		console.log("GET");
		res.sendFile(_dirname+'mainWindow.html')

	})
	app.post('/file-upload1',(req,res)=>{// upload ferst file with text
		
		if(req.files){
		let file=req.files.file;
		let filename= file.name;
		console.log(file);
		sizeofFile=file.size;
		
		nameFileText=filename;
		file.mv(PathSaveFailesLM+filename,(err)=>{
			if(err) throw err;
		})
		file.mv(PathSaveFailesHM+filename,(err)=>{
			if(err) throw err;
		})
		}
		console.log("file uploaded");

		

		fs.unlink(fileUn, (err) => {// delete file with Old answers  from the boddy of the progect
		  if (err) {
			console.error('Error deleting file:', err);
			return;
		  }
		
		  console.log('File deleted successfully.');
		  fileExist=0;
		});
	})

	app.get('/file-upload2',(req,res)=>{
		console.log("GET");
		res.sendFile(_dirname+'mainWindow.html')

	})
	app.post('/file-upload2',(req,res)=>{// upload 2 file with words
		if(req.files){
		let file=req.files.file;
		let filename= file.name;
		console.log(filename);
		nameFileWords=filename;
		file.mv(PathSaveFailesLM+filename,(err)=>{
			if(err) throw err;
		})
		file.mv(PathSaveFailesHM+filename,(err)=>{
			if(err) throw err;
		})
		}
	})

if (app.listen(3000)){
	console.log("listening on 3000");
}