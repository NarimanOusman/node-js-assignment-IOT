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
    
    console.log(`${method} ${url}`);
    
    // Remove /api prefix and clean URL
    let cleanUrl = url;
    if (cleanUrl.startsWith('/api')) {
      cleanUrl = cleanUrl.slice(4); // Remove /api
    }
    if (!cleanUrl.startsWith('/')) {
      cleanUrl = '/' + cleanUrl;
    }
    
    // Parse the clean URL
    const urlParts = cleanUrl.split('?')[0].split('/').filter(Boolean);
    const route = urlParts[0];
    const id = urlParts[1];
    
    console.log(`Route: ${route}, ID: ${id}`);
    
    // GET /getUsers
    if (method === 'GET' && route === 'getUsers') {
      console.log('Fetching all users...');
      const users = await User.find();
      console.log(`Found ${users.length} users`);
      return res.status(200).json(users);
    }

    // POST /createUser
    if (method === 'POST' && route === 'createUser') {
      console.log('Creating user with data:', body);
      const user = await User.create(body);
      console.log('User created:', user);
      return res.status(200).json(user);
    }

    // GET /getUser/:id
    if (method === 'GET' && route === 'getUser' && id) {
      console.log(`Fetching user with ID: ${id}`);
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    }

    // PUT /updateUser/:id
    if (method === 'PUT' && route === 'updateUser' && id) {
      console.log(`Updating user ${id} with data:`, body);
      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        {
          name: body.name,
          email: body.email,
          age: body.age
        },
        { new: true }
      );
      console.log('User updated:', updatedUser);
      return res.status(200).json(updatedUser);
    }

    // DELETE /deleteUser/:id
    if (method === 'DELETE' && route === 'deleteUser' && id) {
      console.log(`Deleting user ${id}`);
      await User.findByIdAndDelete(id);
      console.log('User deleted');
      return res.status(200).json({ message: "User deleted successfully" });
    }

    // Route not found
    console.log(`Route not found: ${method} ${cleanUrl}`);
    return res.status(404).json({ message: "Route not found", path: cleanUrl, method });

  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ message: error.message, error: error.toString() });
  }
}
