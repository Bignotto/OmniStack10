const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

//creat application
const app = express();

//database connect
mongoose.connect('mongodb+srv://damaris:wallgreens@cluster0-ue8ci.mongodb.net/devradar?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
/*
query params: parâmetros na url
- ?nome=valor
- Filtros, paginação, etc
req.query

route params: parâmetros identificados na rota/url
- identifica o recurso
req.params

body params: json enviado por formulários
- bastante informação
req.body
*/

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('> Server runnin on port 3333');
})