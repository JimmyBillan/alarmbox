var sqlite3 	= require('sqlite3').verbose();

var mB = {
  dbName : 'userPreferences',
  userId : 1 // Un seul et unique utilisateur sur l'alarmBox V1
}

class userPreferences{
  constructor(id, gotCalendar, timeBeforeFirstEvent, timeForPerfect){
    this.id = id;
    this.gotCalendar = gotCalendar;
    this.timeBeforeFirstEvent = timeBeforeFirstEvent;
    this.timeForPerfect = timeForPerfect;
  }

  static timeIsValid(time){
    var time = parseInt(time);
    if(!isNaN(time)){
      if(time > 0){
        return time;
      }else{
        return null;
      }
    }else{
      return null;
    }
  }

  static alarmCancel(cb){
    var db    = new sqlite3.Database('jimmybillan.db');
    var stmt = db.prepare("UPDATE userPreferences SET alarmTime = null");
          stmt.run(function(err) {
              if(err)cb(err)
              else cb(null);
            db.close();
          });
    stmt.finalize();
  }

  static alarmEnable(mdate, cb){
    var db    = new sqlite3.Database('jimmybillan.db');
    var stmt = db.prepare("UPDATE userPreferences SET alarmTime = ?");
          stmt.run(mdate,function(err) {
              if(err)cb(err)
              else cb(null);
            db.close();
          });
    stmt.finalize();
  }

  updatetimeBeforeFirstEvent(cb) {
    this.timeBeforeFirstEvent = userPreferences.timeIsValid(parseInt(this.timeBeforeFirstEvent));
    if(this.timeBeforeFirstEvent != null){
      var db    = new sqlite3.Database('jimmybillan.db');
      var stmt = db.prepare("UPDATE "+mB.dbName+" SET timeBeforeFirstEvent=? WHERE id = ?");
      stmt.run(this.timeBeforeFirstEvent, mB.userId, function(err) {
        if(err)cb(err)
        else cb(null);
      db.close();
      });
      stmt.finalize();
    }else{
      console.log(this.timeBeforeFirstEvent);
      cb("error invalid input");  
    }
  }

  updatetimeForPerfect(cb) {
    this.timeForPerfect  = userPreferences.timeIsValid(parseInt(this.timeForPerfect));
    if(this.timeForPerfect  != null){
      var db    = new sqlite3.Database('jimmybillan.db');
      var stmt = db.prepare("UPDATE "+mB.dbName+" SET timeForPerfect =? WHERE id = ?");
      stmt.run(this.timeForPerfect , mB.userId, function(err) {
        if(err)cb(err)
        else cb(null);
      db.close();
      });
      stmt.finalize();
    }else{
      console.log(this.timeForPerfect );
      cb("error invalid input");  
    }
  }

}


exports.newObject = function(id, gc, tbfe, tfp) {
  return new userPreferences(id, gc, tbfe, tfp);
};

exports.updategotCalendar = function(gotCalendar, cb) {
  var db    = new sqlite3.Database('jimmybillan.db');
  var UP = new userPreferences(null, gotCalendar, null, null)
  var stmt = db.prepare("UPDATE "+mB.dbName+" SET gotCalendar=? WHERE id = ?");
  stmt.run(UP.gotCalendar, mB.userId, function(err) {
    if(err)console.log(err)
    else cb(null);

  db.close();
  });
  stmt.finalize();
}

exports.getuserpreference = function(cb) {
   var db    = new sqlite3.Database('jimmybillan.db');
   db.get('SELECT * FROM userPreferences WHERE id = ?',[1], function(err, row) {      
   
    cb(row);
    db.close();

    });
};
exports.setalarm = function(datealarm) {
      var db    = new sqlite3.Database('jimmybillan.db');
      var stmt = db.prepare("UPDATE "+mB.dbName+" SET alarmTime=? WHERE id = ?");
      stmt.run(datealarm, mB.userId, function(err) {
       
      db.close();
      });
      stmt.finalize();
}

exports.getalarm = function(cb) {
   var db    = new sqlite3.Database('jimmybillan.db');
   db.get('SELECT alarmTime FROM userPreferences WHERE id = ?',[1], function(err, row) {      
    
    if(err)
      cb(err)
    else
      cb(row);
    db.close();

    });
};


exports.getgotCalendar = function(cb) {
   var db    = new sqlite3.Database('jimmybillan.db');
   db.get('SELECT gotCalendar FROM userPreferences WHERE id = ?',[1], function(err, row) {      
   
    cb(row);
    db.close();

    });

};

exports.alarmCancel = function(cb) {
  userPreferences.alarmCancel(cb);
};

exports.alarmEnable = function(mdate, cb) {
  userPreferences.alarmEnable(mdate, cb);
};



 /* var db    = new sqlite3.Database('jimmybillan.db');
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='userPreferences'",function(err, rows) {
  if(err !== null) {
    console.log(err);
  }
  else if(rows === undefined) {
    db.run('CREATE TABLE "userPreferences" ' +
           '("id"  INTEGER PRIMARY KEY AUTOINCREMENT,'+
           'gotCalendar BOOLEAN NOT NULL,'+
           'timeBeforeFirstEvent INT,'+
           'timeForPerfect INT)', function(err) {
      if(err !== null) {
        console.log(err);
      }
      else {
        console.log("SQL Table 'userPreferences' initialized.");
      }
    });
  }
  else {
    console.log("SQL Table 'userPreferences' already initialized.");
  }
});
/*
 db.get('SELECT * FROM userPreferences ', function(err, row) {      
    console.log(row);
  });

 var db    = new sqlite3.Database('jimmybillan.db');
var stmt = db.prepare("INSERT INTO userPreferences VALUES (?,?,?,?)");
  stmt.run(null, 0,90,20);
  stmt.finalize();
  db.close();
*/