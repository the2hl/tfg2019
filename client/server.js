const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const sha256 = require('js-sha256');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'tfg2hl',
  database : 'users'
});

connection.connect(err=>{
  if(err){
    return err;
  }
});

const app = express();

app.use(cors());

app.get('/', function (req, res) {
  console.log('/');
  res.send('Visita /usuarios para ver a los usuarios');
});

app.get('/usuarios', function (req, res) {
  const SELECT_ALL_USERS_QUERY = 'select * from usuarios';
  connection.query(SELECT_ALL_USERS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      console.log('/usuarios');
      return res.json({ data: results });
    }
  });
});

app.get('/usuarios/add', function (req, res) {
  const {dni,nombre,apellido_1,apellido_2, password} = req.query;
  const password_hash = sha256(password);
  const INSERT_USER_QUERY = 
    `insert into usuarios (dni, nombre, apellido_1, apellido_2, password_hash) 
    values ('${dni}','${nombre}','${apellido_1}','${apellido_2}','${password_hash}')`;
  connection.query(INSERT_USER_QUERY, (err, results)=> {
    if (err){
      return res.send(err);
    }else{
      console.log('/usuarios/add');
      return res.send('Usuario añadido correctamente');
    }
  });
});
// Start the server
app.listen(3001, () => {
 console.log('Servidor escuchando en el puerto 3001');
});