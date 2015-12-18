var sqlite3 	= require('sqlite3').verbose();

var mB = {
  dbName : 'Capteurs',
  userId : 1 // Un seul et unique utilisateur sur l'alarmBox V1
}

class Capteurs{
  constructor(idUserPreferences, timestamp, soundLevel, temp, humidity, moves, light){
    this.idUserPreferences = idUserPreferences;
    this.timestamp = timestamp;
    this.soundLevel = soundLevel;
    this.temp = temp;
    this.humidity = humidity;
    this.moves = moves;
    this.light = light;
  }

  undefinedToNull(){
    var self = this;
    Object.keys(self).forEach(function (key) {
      if(self[key] == undefined)
          self[key] = null;
    });
  }

  static dbselect(arrProjection,selection, cb){

    var strProjection;
    for (var i = 0; i < arrProjection.length; i++) {
      if(i == 0){
        strProjection = arrProjection[0];
      }else{
        strProjection = strProjection+","+arrProjection[i];
      }
    };
    var db    = new sqlite3.Database('jimmybillan.db');
    db.all('SELECT '+strProjection+' FROM Capteurs '+selection, function(err, rows) {      
      console.log(err);
       cb(rows)
    });
     db.close();

  }

  save() {
      var db    = new sqlite3.Database('jimmybillan.db');
      var self = this;
      db.get('SELECT * FROM Capteurs WHERE idUserPreferences = '+this.idUserPreferences+' AND timestamp = "'+this.timestamp+'" ;', function(err, row) {
        
        if(row == undefined){
          var stmt = db.prepare("INSERT INTO Capteurs VALUES (?,?,?,?,?,?,?)");
          stmt.run(
            self.idUserPreferences, 
            self.timestamp,
            self.soundLevel,
            self.temp,
            self.humidity,
            self.moves,
            self.light);
          stmt.finalize();
        }else{
          Object.keys(self).forEach(function (key) {
            if(self[key] != null){
              row[key] = self[key];
            }
          });
          
          var stmt = db.prepare("UPDATE Capteurs SET soundLevel = ?,temp = ?, humidity = ?, moves = ?, light = ? WHERE idUserPreferences = ? AND timestamp = ? ");
          stmt.run(
            row.soundLevel,
            row.temp,
            row.humidity,
            row.moves,
            row.light,
            row.idUserPreferences, 
            row.timestamp); 
          stmt.finalize();
        }
      });
     

      db.close();
    
  }

}

exports.newObject = function(id, timestamp, sl, tmp, h, m, l) {
 var c = new Capteurs(id, timestamp, sl, tmp, h, m, l)
 c.undefinedToNull();
 return c;
};

exports.dbselect = function(arr,selection, cb) {
  Capteurs.dbselect(arr,selection, cb);
};


/*
 var db    = new sqlite3.Database('jimmybillan.db');
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Capteurs'",function(err, rows) {
  if(err !== null) {
    console.log(err);
  }
  else if(rows === undefined) {
    db.run('CREATE TABLE "Capteurs" ' +
           '(idUserPreferences  NOT NULL,'+
           'timestamp INT NOT NULL,'+
           'soundLevel INT,'+
           'temp INT,'+
           'humidity INT,'+
           'moves INT,'+
           'light INT,'+
           'PRIMARY KEY(idUserPreferences, timestamp))', function(err) {
      if(err !== null) {
        console.log(err);
      }
      else {
        console.log("SQL Table 'Capteurs' initialized.");
      }
    });
  }
  else {
    console.log("SQL Table 'Capteurs' already initialized.");
  }
});*/
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