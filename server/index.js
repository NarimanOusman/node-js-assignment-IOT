import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from './model/Users.model.js';

dotenv.config();
const mongoURI = process.env.MONGO_URI;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.listen(3000,()=>{
    try {
        console.log("Server is running on port 3000");
    } catch (error) {
        console.error("Error starting server:", error);
    }
    
})


app.post('/createUser', async (req, res) => {
    try {
        const users = await User.create(req.body);    
        res.json(users);
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find();    
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get('/getUser/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error.message);
        res.status(500).json({ message: error.message });
    }
});

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});
