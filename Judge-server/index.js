const express = require('express');
const cors = require('cors');
const Axios = require("axios");
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.69xrmld.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const problems = client.db('problems').collection('prob');
        const users = client.db('users').collection('usersRecord');

        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await users.insertOne(newUser);

            res.send(result);
        })
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = users.find(query);
            const Users = await cursor.toArray();

            res.send(Users);
        });

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await users.findOne(query);

            res.send(user);
        });

        app.get('/problems', async (req, res) => {
            const query = {};
            const cursor = problems.find(query);
            const questions = await cursor.toArray();

            res.send(questions);
        });

        app.get('/problems/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const question = await problems.findOne(query);

            res.send(question);
        });

        // update data
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const user = await users.findOne(query);
            const updateUser = req.body;
            const options = { upsert: true };

            // console.log(updateFruits);

            const updateDoc = {
                $set: {
                    quantity: updateFruits.quantity ? updateFruits.quantity : fruit.quantity,
                    shortDescription: updateFruits.shortDescription ? updateFruits.shortDescription : fruit.shortDescription,
                    img: updateFruits.img ? updateFruits.img : fruit.img,
                    sold: updateFruits.sold ? updateFruits.sold : fruit.sold
                }
            }

            const result = await fruitCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        // code run from codex API
        app.post("/compile", (req, res) => {
            //getting the required data from the request
            let code = req.body.code;
            let language = req.body.language;
            let input = req.body.input;
            // console.log(req.body);

            if (language === "python") {
                language = "py"
            }

            let data = ({
                "code": code,
                "language": language,
                "input": input
            });
            let config = {
                method: 'post',
                url: 'https://codex-api.herokuapp.com/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            //calling the code compilation API
            Axios(config)
                .then((response) => {
                    res.send(response.data)
                    // console.log(response.data)
                    // console.log(req.body);
                }).catch((error) => {
                    console.log(error);
                });
        });
    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Server is Running')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})