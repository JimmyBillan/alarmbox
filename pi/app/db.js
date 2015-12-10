var sqlite3 	= require('sqlite3').verbose();
//var db 			= new sqlite3.Database('jimmybillan.db');


// build database
/*
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='boxes'",function(err, rows) {
  if(err !== null) {
    console.log(err);
  }
  else if(rows === undefined) {
    db.run('CREATE TABLE "boxes" ' +
           '("id"  VARCHAR(255) PRIMARY KEY) ', function(err) {
      if(err !== null) {
        console.log(err);
      }
      else {
        console.log("SQL Table 'boxes' initialized.");
      }
    });
  }
  else {
    console.log("SQL Table 'boxes' already initialized.");
  }
});
*/

// create box
/*
 var stmt = db.prepare("INSERT INTO boxes VALUES (?)");
  stmt.run("randomKey");
  stmt.finalize();
  db.close();
*/

//List box
/*
 db.get('SELECT * FROM boxes ', function(err, row) {      
    console.log(row);
  });
*/
   var db    = new sqlite3.Database('jimmybillan.db');
  db.get('SELECT gotCalendar FROM userPreferences WHERE id = ?',[1], function(err, row) {      
   console.log(err);
    console.log(row);
  db.close();

  });
