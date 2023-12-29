const express = require("express");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;

//// middleware

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://task-management-643fc.web.app",
      "https://task-management-643fc.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
// app.use(cookieParser());
///shamimrezabd67
///9TajKTbQp7Zs03vk

const uri =
  "mongodb+srv://shamimrezabd67:9TajKTbQp7Zs03vk@cluster0.q16reuk.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    const allTaskCollection = client.db("task").collection("allTask");

    /// all task

    app.post("/allTask", async (req, res) => {
      const allTask = req.body;
      const result = await allTaskCollection.insertOne(allTask);
      res.send(result);
    });

  

    app.delete("/allTask/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const filter = {_id: new ObjectId(id) };
      const result = await allTaskCollection.deleteOne(filter);
      res.send(result);
    });

    app.put("/allTaskPut/:id", async (req, res) => {
      const id = req.params.id
      const status = req.body
      const filter = {_id: new ObjectId(id)}
      const updateDoc = {
        $set: {
          status: status.status, 
          todo: "all"
        },
      };
      const result = await allTaskCollection.updateOne(
        filter,
        updateDoc,
      );
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
