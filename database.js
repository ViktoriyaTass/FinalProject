

const mysql = require('mysql2');



// Create a connection
const connection = mysql.createConnection({
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

  // Execute a query
  
});

module.exports = {
  data : function(email, password, onRes){
    connection.query("SELECT * FROM sys.users where username='"+email+"' and userpassword='"+password+"'", (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        return;
      }
      onRes(results.length > 0);
  
  });},

    add : function(email,password,onRes){

  connection.query("SELECT * FROM sys.users where username='"+email+"' and userpassword='"+password+"'", (error, results) => {
  console.log(results);
  if(results.length>0)
  {onRes (0); }
  else
    connection.query("insert into sys.users(username,userPassword) values('"+email+"','"+password+"')",(error,results=>{
    if (error){
      console.error('Error executing query:', error);
      return;
    }
     onRes(1);
    }))
   
  
  // console.error('Error executing query:', error);
  //   return;

 });
}}
