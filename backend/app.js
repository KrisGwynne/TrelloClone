const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();




const app = express();
const port = 9000;

MongoClient.connect(process.env.url, function(err, client) {
    if (err) {
        console.log('Error connecting to database');
    } else {
        console.log("Connected successfully to server");
       
        const db = client.db('TrelloProjects');
    
        app.get('/', (req, res) => res.send('Hello World!'))
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))