var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var occupation = JSON.parse(fs.readFileSync('convertcsv.json', 'utf8'));

var db = new sqlite3.Database(':memory:');
db.serialize(function () {
  db.run('CREATE TABLE occupation (id REAL, org TEXT, area TEXT, gender TEXT, occ TEXT, num TEXT, person TEXT)');
  var stmt = db.prepare('INSERT INTO occupation (id,org,area,gender,occ,num,person) VALUES (?,?,?,?,?,?,?)');
  for (var i = 0; i < occupation.length; i++) {
      stmt.run(occupation[i].id
               , occupation[i].org
               , occupation[i].area
               , occupation[i].gender
               , occupation[i].occ
               , occupation[i].num
               , occupation[i].person
              );
  }
  stmt.finalize();

db.each("SELECT * FROM occupation", function(err, row) {
      console.log(row.id + ": " + row.org + " " + row.area + " " + row.gender + " " + row.occ + " " + row.num + " " + row.person);
  });
});

function getId(Id){
 db.all("SELECT * FROM occupation WHERE id LIKE '+Id+' ", function(err, row){
 list.push(row);
 });
    return list;
}

db.close();








// Create an instance of an express HTTP server application.
var app = express();

// Add a route at the webserver's root using the GET method.
app.get('/', function(req, res) {
res.send("This is the My API.");  // Respond with a simple text message when a user visits the route.
});

// all of db to 127.0.0.1:8000/data
app.get('/data', function(req, res) {    
        res.send(occupation);
  });

// id C02 to 127.0.0.1:8000/getId
app.get('/data/getId/:id', function(req, res) {    
    data = [];
    
    for (var j =0; j <occupation.length; j++)
        if(occupation[j].id == req.params.id)
            data.push(occupation[j]);
    res.json(data);
    
  });

var server = app.listen(8888);
