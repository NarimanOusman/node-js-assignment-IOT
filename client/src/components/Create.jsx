import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();
    const Submit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/createUser", { name, email, age })
            .then((response) => {
                console.log("User created:", response.data);
                navigate('/');
            })
            .catch((error) => {
                console.error("Error creating user:", error.message);
            });
    };

    

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center ">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit = {Submit}>
            <h1>Create User</h1>
            <div className="mb-2">
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text" placeholder="Enter Name" className="form-control" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mb-2">
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder="Enter Email" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-2">
                <label htmlFor="age"><strong>Age</strong></label>
                <input type="number" placeholder="Enter Age" className="form-control" onChange={(e) => setAge(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-success">
              Create User
            </button>
        </form>
        
      </div>
    </div>
  )
}

export default Create