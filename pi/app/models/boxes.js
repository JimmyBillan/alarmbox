var sqlite3 	= require('sqlite3').verbose();

var mB = {
  dbName : 'boxes'
}

class Box{
  constructor(id){
    this.id = id;
  }
}

exports.login = function(id, cb) {
   var db    = new sqlite3.Database('jimmybillan.db');
  var box = new Box(id)
  db.get('SELECT * FROM '+mB.dbName+' WHERE id = ? ',[box.id], function(err, row) {     
    
    if(row){
      cb(true);
    }else{
      cb(false)
    }
    
  });

  db.close();
}



// build database
 //var db    = new sqlite3.Database('jimmybillan.db');
/*db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='boxes'",function(err, rows) {
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


//List box

 db.get('SELECT * FROM boxes ', function(err, row) {      
    console.log(row);
  });*/


