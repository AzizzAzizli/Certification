const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Certificate = require("./models/certificate");
const Admin = require("./models/admin");

const app = express();

// const DbUrl = "mongodb+srv://asoiu1920:azii1920asoiu@myprojects.gfu2fly.mongodb.net/asoiu-certificates?retryWrites=true&w=majority&appName=MyProjects";
const DbUrl ='mongodb://localhost:27017/ASOİU-Certificates'

mongoose.connect(DbUrl)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/post-certificates', (req, res) => {
    console.log(req.body);
    const certificate = new Certificate(req.body);
    certificate.save()
        .then((result) => {
            res.status(201).json({ message: 'Certificate received', data: result , status: 201 });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Error saving certificate', error: err ,status:500 });
        });
});

app.get('/api/get-certificates', (req, res) => {
    Certificate.find().sort({ createdAt: -1 })
        .then((result) => {
            res.status(200).json({status: 200 , result:result});
        })
        .catch((err) => {
            console.log("Something went wrong:", err);
            res.status(500).json({ message: 'Error retrieving certificates', error: err, status: 500});
        });
});

app.get('/api/get-admin', (req, res) => {
    Admin.find()
        .then((result) => {
            res.status(200).json({status: 200 , result:result});
        })
        .catch((err) => {
            console.log("Something went wrong:", err);
            res.status(500).json({ message: 'Error retrieving certificates', error: err, status: 500});
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
