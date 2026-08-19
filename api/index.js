import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from './Users.model.js';

dotenv.config();
const mongoURI = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to handle /api prefix routing
app.use((req, res, next) => {
    // If path starts with /api/, strip it for internal routing
    if (req.path.startsWith('/api/')) {
        req.url = req.path.slice(4); // Remove /api prefix
    }
    // Handle root path redirects
    if (req.path === '/api') {
        req.url = '/';
    }
    next();
});

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Routes - remove /api prefix since middleware handles it
app.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find();    
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ message: error.message });
    }
});

app.post('/createUser', async (req, res) => {
    try {
        const users = await User.create(req.body);    
        res.json(users);
    } catch (error) {
        console.error("Error creating user:", error.message);
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

app.put('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(
            { _id: id }, 
            {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            },
            { new: true } 
        );
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        try{
             await User.findByIdAndDelete(id)
             res.json({ message: "User deleted successfully" });
        } catch (error) {
            console.error("Error deleting user:", error.message);
            res.status(500).json({ message: error.message });
        }
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ message: error.message });
    }
});

export default app;
