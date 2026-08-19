import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from './Users.model.js';

dotenv.config();
const mongoURI = process.env.MONGO_URI;

// Initialize CORS middleware
const corsMiddleware = cors();

// Helper to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Ensure MongoDB connection
let isConnected = false;
async function ensureConnected() {
  if (!isConnected) {
    try {
      await mongoose.connect(mongoURI);
      isConnected = true;
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
}

export default async function handler(req, res) {
  // Enable CORS
  await runMiddleware(req, res, corsMiddleware);
  
  res.setHeader('Content-Type', 'application/json');

  try {
    await ensureConnected();

    const { method, url, body } = req;
    
    // Parse URL to get route and params
    const [_, ...pathParts] = url.split('/').filter(Boolean);
    const route = pathParts.join('/');
    
    // GET /getUsers
    if (method === 'GET' && route === 'getUsers') {
      const users = await User.find();
      return res.status(200).json(users);
    }

    // POST /createUser
    if (method === 'POST' && route === 'createUser') {
      const user = await User.create(body);
      return res.status(200).json(user);
    }

    // GET /getUser/:id
    if (method === 'GET' && route.startsWith('getUser/')) {
      const id = route.split('/')[1];
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    }

    // PUT /updateUser/:id
    if (method === 'PUT' && route.startsWith('updateUser/')) {
      const id = route.split('/')[1];
      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        {
          name: body.name,
          email: body.email,
          age: body.age
        },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    }

    // DELETE /deleteUser/:id
    if (method === 'DELETE' && route.startsWith('deleteUser/')) {
      const id = route.split('/')[1];
      await User.findByIdAndDelete(id);
      return res.status(200).json({ message: "User deleted successfully" });
    }

    // Route not found
    return res.status(404).json({ message: "Route not found" });

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
}
