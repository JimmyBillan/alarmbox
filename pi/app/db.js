
var sqlite3 	= require('sqlite3').verbose();
var db 			= new sqlite3.Database('jimmybillan.db');
/*
var mail = "";
var password = "";*/


/*db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'",function(err, rows) {
  if(err !== null) {
    console.log(err);
  }
  else if(rows === undefined) {
    db.run('CREATE TABLE "users" ' +
           '("id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
           '"mail" VARCHAR(255), ' +
           '"password" VARCHAR(255))', function(err) {
      if(err !== null) {
        console.log(err);
      }
      else {
        console.log("SQL Table 'users' initialized.");
      }
    });
  }
  else {
    console.log("SQL Table 'users' already initialized.");
  }
});


 db.run('CREATE TABLE "cards" ' +
           '("id" INTEGER PRIMARY KEY AUTOINCREMENT, ' +
           '"title" VARCHAR(255), ' +
           '"subtitle" TEXT, ' +
           '"imageUrl" TEXT, ' +
           '"description" TEXT, ' +
           '"url1" TEXT, ' +
           '"descUrl1" VARCHAR(255), ' +
           '"url2" TEXT, ' +
           '"descUrl2" VARCHAR(255))', function(err) {
      if(err !== null) {
        console.log(err);
      }
      else {
        console.log("SQL Table 'cards' initialized.");
      }
});*/
db.get("SELECT * FROM cards", function(err, rows) {
	console.log(rows);
})
db.close();