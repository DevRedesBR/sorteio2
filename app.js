require('dotenv').config();
const database = require('./database'); // Se database for uma função ou objeto, ajuste conforme necessário
const express = require("express");
const app = express();

app.use(express.json());

app.get('/database/:h', async (req, res, next) => {
    console.log("Param url ->  "+ req.params.h);
    let q = "SELECT * from lead WHERE key_hash = $1";
    let params = [req.params.h.toString()];
    console.log("Params array-> "+params);
    let result = await database(q,params); // Ajuste o uso de acordo com a exportação do seu módulo de banco de dados
    res.json({result:true});
    console.log(result);
});

app.listen(process.env.PORT_SERVER, function(){
    console.log("Server started on port -> " + process.env.PORT_SERVER);
});
