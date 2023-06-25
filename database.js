

const mysql = require('mysql2');



// Create a connection
const connection = mysql.createConnection({//  create connection to SQL DB 
  host: 'localhost',
  user: 'root',
  password: 'rost1234',

});

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the database');

  
  
});

module.exports = {
  data : function(email, password, onRes){// check if user exist in DB
    connection.query("SELECT * FROM sys.users where username='"+email+"' and userpassword='"+password+"'", (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        return;
      }
      onRes(results.length > 0);
  
  });},

    add : function(email,password,onRes){ // add new user to the DB

  connection.query("SELECT * FROM sys.users where username='"+email+"' and userpassword='"+password+"'", (error, results) => {
  console.log(results);
  if(results.length>0)//if user with this parameters exist
  {onRes (0); }// return 0
  else// if user with this parameters not exist=
    connection.query("insert into sys.users(username,userPassword) values('"+email+"','"+password+"')",(error,results=>{
    if (error){
      console.error('Error executing query:', error);
      return;
    }
     onRes(1);// return 1 ( add him to the DB)
    }))
   
  

 });
}}
