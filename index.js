const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

// mongoDB Local Credential
const uri = `mongodb://localhost:27017`;

// mongoDB Server Credential
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.djxbtyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function main() {
    try {
        const db = client.db('Demo');
        console.log("Successfully connected to MongoDB!");

        // Define a database and collection
        const Collection = db.collection('demo');

        app.post('/demo', async (req, res) => {
            const demo = req.body;
            const result = await Collection.insertOne(demo);
            res.send(result);
          });


        // express server 
        app.get('/', (req, res) => {
            res.send(`Server is running at ${new Date().toLocaleTimeString()}!`);
        });
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        });
    } catch (error) {
        console.error("Failed to run server!", error);
    }
}

main();