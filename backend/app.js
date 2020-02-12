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
       
        const db = client.db('TrelloProjects').collection('lists');

        app.route('/NewTicket')
            .post((req,res,next) => {
                const body = req.body;

                console.log(body.list)
                
                const ticket = {
                    title: body.title,
                    description: body.description,
                    dueDate: body.dueDate
                }
                    
                db.findOneAndUpdate({list: body.list},
                    {$push : {tickets: ticket}},
                    (err,doc) => {
                        if (err) {
                            console.log('Error')
                            console.log(err);
                        } else if (!doc.lastErrorObject.updatedExisting) {
                            db.insertOne({
                                list: body.list,
                                tickets: [ticket]
                            },(err, doc) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('added new list and ticket');
                                    next();
                                }
                            })
                        } else {

                            console.log('added new ticket to list' + body.list);
                            next();
                        }
                    }
                    )
            },(req,res) => {res.send('Successfully added new ticket')}
        )

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
    
        app.get('/', (req, res) => res.send('Hello World!'))
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))