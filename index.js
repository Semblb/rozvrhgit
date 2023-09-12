const express = require('express')
const app = express()
const port = 80
const path = require('path'); //pro naservirovani celych html
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const mysql = require('mysql2');

const connection = mysql.createConnection({ //připojuje k databázi
  host: '192.168.1.161', //ip databáze
  user: 'sebastien.findza', //jméno uživatele
  password: 'jamamheslo23', //heslo
  database: 'sebastien.findza', //název databáze
  port: 3001
});

app.get('/rozvrh', (req, res) => {//home routa

  connection.connect(function(err) {
      if (err) throw err;
      connection.query("SELECT * FROM rozvrh", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.render('index.ejs', { result });
      });
    });

})

app.listen(port, () => {//spustni serveru
console.log(`Example app listening on port ${port}`)
})
 
