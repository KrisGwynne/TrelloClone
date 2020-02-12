const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();



const app = express();
const port = 9000;

app.use(cors())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

MongoClient.connect(process.env.url, function(err, client) {
    if (err) {
        console.log(err);
        console.log('Error connecting to database');
    } else {
        console.log("Connected successfully to server");
       
        const db = client.db('TrelloProjects').collection('Ticket');

        app.route('/NewTicket')
            .post((req,res,next) => {
                const body = req.body;
                db.insertOne({
                    title: body.title,
                    description: body.description,
                    dueDate: body.dueDate,
                }, (err, doc) => {
                    if (err) {
                        console.log('error added new ticket');
                        console.log(err);
                        res.send('Error adding new ticket');
                    } else {
                        console.log('added new ticket');
                        next();
                    }
                })
            }, (req,res) => {res.send('Successfully added new ticket')}
        )

        app.route('/FindTickets')
            .get((req,res) => {
                db.find({}).toArray((err, tickets) => {
                    if (err) {
                        console.log('error finding tickets');
                        console.log(err);
                    } else if (tickets){
                        console.log('found tickets')
                        console.log(tickets);
                        res.send(tickets)
                    } else {
                        console.log('no tickets found')
                    }
                })
            })

        // db.findOne({name: 'test'}, (err,doc) => {
        //     if (err) {
        //         console.log('error');
        //         console.log(err)
        //     } else {
        //         console.log(doc);
        //     }
        // })
    
        app.get('/', (req, res) => res.send('Hello World!'))
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))