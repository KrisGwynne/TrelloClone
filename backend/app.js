const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectID    = require('mongodb').ObjectId;
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
       
        const db = client.db('TrelloProjects').collection('lists');

        app.route('/NewTicket')
            .post((req,res,next) => {
                const body = req.body;

                console.log(body.list)
                
                const ticket = {
                    id: Date.now(),
                    title: body.title,
                }
                    
                db.findOneAndUpdate({list: body.list},
                    {$push : {tickets: ticket}},
                    (err,doc) => {
                        if (err) {
                            console.log('Error')
                            console.log(err);
                            throw(err);
                        } else {
                            console.log('added new ticket to list: ' + body.list);
                            next();
                        }
                    }
                    )
            },(req,res) => {res.send('Successfully added new ticket')}
        )

        app.route('/NewList')
            .post((req,res) => {
                db.insertOne({
                    list: req.body.list,
                    tickets: [],
                },(err,doc) => {
                    if (err) {
                        console.log('error');
                        console.log(err);
                    } else {
                        console.log('added new list');
                        res.send('Successfully added new list');
                    }
                })
            })

        app.route('/DeleteTicket')
            .post((req,res) => {
                db.update({list: req.body.list}, {$pull: {tickets: {id: req.body.id}}}, (err,doc) => {
                    if (err) {
                        console.log('error')
                        console.log(err);
                    } else {
                        res.send('success deleting!');
                    }
                })
            })

        app.route('/DeleteList')
            .post((req,res) => {
                db.remove({list: req.body.list}, (err,doc) => {
                    if (err) {
                        console.log('error')
                        console.log(err);
                    } else {
                        res.send('success deleting!');
                    }
                })
            })

        app.route('/FindLists')
            .get((req,res) => {
                db.find({}).toArray((err, tickets) => {
                    if (err) {
                        console.log('error finding Lists');
                        console.log(err);
                    } else if (tickets){
                        console.log('found lists')
                        console.log(tickets);
                        res.send(tickets)
                    } else {
                        console.log('no lists found')
                    }
                })
            })

        app.route('/UpdateLists')
        .post((req,res) => {
            for (let i = 0; i < req.body.lists.length; i++) {

                let list = req.body.lists[i];
                list._id = new ObjectID(list._id);

                db.findOneAndReplace({_id: list._id },list,(err,doc) => {
                    if (err) {
                        console.log(err);
                    } else {
                    }
                })
            }
            res.send('success')
        })
    
        app.get('/', (req, res) => res.send('Hello World!'))
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))