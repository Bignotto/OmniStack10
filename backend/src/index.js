const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const routes = require('./routes');
const cors = require('cors');

const { setupWebSocket } = require('./websocket');

//creat application
const app = express();
const server = http.Server(app);

setupWebSocket(server);

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
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333, () => {
    console.log('> Server runnin on port 3333');
})