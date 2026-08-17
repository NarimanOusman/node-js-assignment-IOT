import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../components/User.css'

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
    const navigate = useNavigate();
  const Submit = async (e) => {
        e.preventDefault();
    setShowAddModal(true);
  };

  const confirmAddUser = () => {
    axios.post("http://localhost:3000/createUser", { name, email, age })
            .then((response) => {
                console.log("User created:", response.data);
        setShowAddModal(false);
                navigate('/');
            })
            .catch((error) => {
                console.error("Error creating user:", error.message);
            });
    };

  const cancelAddUser = () => {
    setShowAddModal(false);
  };

    

  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center ">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={Submit}>
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
      {showAddModal && (
        <div className="confirm-modal-backdrop">
          <div className="confirm-modal">
            <h3>Confirm Add</h3>
            <p>Do you want to add this user to the dashboard?</p>
            <div className="confirm-modal-actions">
              <button type="button" className="btn-cancel" onClick={cancelAddUser}>Cancel</button>
              <button type="button" className="btn-confirm btn-add" onClick={confirmAddUser}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Create