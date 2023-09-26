const express = require('express')
const app = express()
const port = 800
const path = require('path'); //pro naservirovani celych html
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

var mysql = require('mysql2');

const connection = mysql.createConnection({ //připojuje k databázi
  host: '192.168.1.161', //ip databáze
  user: 'sebastien.findza', //jméno uživatele
  password: 'jamamheslo23', //heslo
  database: 'sebastien.findza', //název databáze
  port: 3001
});

app.get('/rozvrh', (req, res) => {//rozvrh routa
  connection.connect(function(err) {
      if (err) throw err;
      connection.query("SELECT * FROM rozvrh", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.render('index.ejs', { result });
      });
    });
})

app.get('/home', (req, res) => {//home routa
  
      connection.query("SELECT * FROM rozvrh", (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.render('menu.ejs', { result });
      });
    
})

app.get('/new', (req, res) => { //new routa
  res.render(path.join(__dirname, 'views', 'new.ejs')); // Odeslání souboru '.' klientovi
});

app.post('/new', function (request, response, next) {
  var sql = `INSERT INTO rozvrh (subject, day, hour, teacher, classroom, building) VALUES('${request.body.sub}','${request.body.day}','${request.body.hou}','${request.body.tea}','${request.body.cla}','${request.body.bui}')`; // SQL dotaz pro vložení nového uživatele do databáze

  connection.query(sql, (error, results, fields) => { // Provedení SQL dotazu
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
  });

  response.render(path.join(__dirname, 'views', 'new.ejs')); // Odeslání odpovědi klientovi

});

//routa delete 
app.get('/delete', (req, res) => {
  res.render(path.join(__dirname, 'views', 'delete.ejs'))
})
//smazání zápisu
app.post('/delete', function (request, respone, next) {
  var sql = `DELETE FROM rozvrh WHERE id = ${request.body.idrozvrh}`

  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
  });
  respone.render(path.join(__dirname, 'views', 'delete.ejs'));
});

app.get('/update', (req, res) => { //update routa
  res.render(path.join(__dirname, 'views', 'update.ejs'))
})
//update záznamu
app.post('/update', function (request, respone, next) {
  var sql = `UPDATE rozvrh SET subject = '${request.body.subject}', day ='${request.body.day}', hour = '${request.body.hour}', teacher ='${request.body.teacher}', classroom ='${request.body.classroom}', building ='${request.body.building}', WHERE id = ${request.body.id}`
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
  })

  respone.sendFile(path.join(__dirname, 'views', 'update.ejs'));

})


app.listen(port, () => {//spustni serveru
console.log(`Example app listening on port ${port}`)
})
 
