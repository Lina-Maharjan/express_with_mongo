require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);
const database = mongoose.connection;

database.on("error", (err) => {
    console.log("error in db connection", err)
});
database.once("connected", () => {
    console.log("DB Connected")
});


const app = express();
app.use(express.json());

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    roll_no: Number,
    subjects: [String],
});
// app.get("/", (req, res) => {
//     res.send("Welcome");
// });

const User = new mongoose.model("User", userSchema);

// const usr = new User({
//     name: "Lina",
//     age: 21,
//     roll_no: 10,
//     subjects: ["DBMS", "MongoDB", "Express", "Node", "React"],
// });
// usr.save();


app.get("/", async(req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post("/", async(req, res) => {
    const data = req.body;
    const userData = new User(data);
    const createdUser = await userData.save();
    res.json(createdUser);
});

app.listen(3000, () => {
    console.log("Server Running on port 3000");
});
