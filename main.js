// Import express to create and configure the HTTP server.
var express = require('express');
// Import sqlite3 to create database.
var sqlite3 = require('sqlite3').verbose();
// Import the fs module so that we can read in files.
var fs = require('fs');
// parse files for express.
var bodyParser = require('body-parser');
// convertcsv json file to be parsed.
var occupation = JSON.parse(fs.readFileSync('convertcsv.json', 'utf8'));
var education = JSON.parse(fs.readFileSync('convertcsv1.json', 'utf8'));

var rowStr;
var numStr;
var list = [];

// Create a HTTP server app.
var app = express();
// Parser for express.
app.use(bodyParser.json()); 
app.use(bodyParser.json({ extended: true }));


// name of database is db
var db = new sqlite3.Database(':memory:');


// Create database db and enter items into occupation table.
db.serialize(function () {
  db.run('CREATE TABLE occupation (id TEXT, org TEXT, area TEXT, gender TEXT, occ TEXT, num INTEGER, person TEXT)');
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
    
// print occupation table to console. 
db.each("SELECT * FROM occupation", function(err, row) {
      console.log(row.id + ": " + row.org + " " + row.area + " " + row.gender + " " + row.occ + " " + row.num + " " + row.person);
  });
});




//var db2 = new sqlite3.Database(':memory:');
db.serialize(function () {
  db.run('CREATE TABLE education (id1 TEXT, org TEXT, area TEXT, gender TEXT, edu TEXT, num1 TEXT, pop TEXT)');
  var stmt1 = db.prepare('INSERT INTO education (id1,org,area,gender,edu,num1,pop) VALUES (?,?,?,?,?,?,?)');
  for (var i = 0; i < education.length; i++) {
      stmt1.run(education[i].id1
               , education[i].org
               , education[i].area
               , education[i].gender
               , education[i].edu
               , education[i].num1
               , education[i].pop
              );
  }
  stmt1.finalize();

db.each("SELECT * FROM education", function(err, row) {
      console.log(row.id1 + ": " + row.org + " " + row.area + " " + row.gender + " " + row.edu + " " + row.num1 + " " + row.pop);
  });
});




// object for occupation table data
var occObj = function(id,org,area,gender,occ,num,person){
  return this.id = (id);
	return this.org = (org) ;
  return this.area = (area);
  return this.gender = (gender);
	return this.occ = (occ);
	return this.num = (num);
	return this.person = (person);
}

// all from occupation
app.get('/occupation', function (req, res) {
  db.all("SELECT * FROM occupation", function(err, row) {
    rowStr = JSON.stringify(row, null, '\t');
    res.sendStatus(rowStr);
  });
});

// all from education
app.get('/education', function (req, res) {
  db.all("SELECT * FROM education", function(err, row) {
    rowStr = JSON.stringify(row, null, '\t');
    res.sendStatus(rowStr);
  });
});

//new list all
db.serialize(function() {
    db.each("SELECT * FROM occupation", function(err, row) {
        list.push(row.id + ": " + row.org + " " + row.area + " " + row.gender + " " + row.occ + " " + row.num + " " + row.person);
    }, function() {
    })
})

app.get('/new', function(req, res){ 
  res.json(list);
});

app.get('/occ', function (req, res) {
  db.each("SELECT * FROM occupation", function(err, row) {
    var row1 = new occObj (
        row.id + " " + row.org + " " + row.area + " " + row.gender + " " + row.occ + " " + row.num + " " + row.person);
    res.json(row1);
  });
});

// occ by num
app.get('/occNum/:num', function (req, res) {
  db.each("SELECT * FROM occupation WHERE num = " + req.params.num, function(err, row) {
    numStr = new occObj (
        row.id + " " + row.org + " " + row.area + " " + row.gender + " " + row.occ + " " + row.num + " " + row.person);
    res.json(numStr);
  });
});

// test both tables
app.get('/both', function (req, res) {
  db.each("SELECT occupation.*, education.* FROM occupation INNER JOIN education ON occupation.id = education.id", function(err, row) {
    var row2 = new occObj (
        row.id + " " + row.org + " " + row.area + " " + row.gender + " " + row.occ + " " + row.num + " " + row.person);
    res.json(row2);
  });
});


  







// Start the server.
var server = app.listen(8000);