import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../components/User.css'

const Update = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/getUser/${id}`)
      .then((response) => {
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setAge(userData.age);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error.message);
      });
  }, [id]);

  // Handle the update form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    setShowUpdateModal(true);
  };

  const confirmUpdateUser = () => {
    axios.put(`http://localhost:3000/updateUser/${id}`, { name, email, age })
      .then((response) => {
        console.log("User updated:", response.data);
        setShowUpdateModal(false);
        navigate('/'); // Redirect back to home page after updating
      })
      .catch((error) => {
        console.error("Error updating user:", error.message);
      });
  };

  const cancelUpdateUser = () => {
    setShowUpdateModal(false);
  };

 

  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center ">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={handleUpdate}>
              <h1>Update User</h1>
              <div className="mb-2">
                  <label htmlFor="name"><strong>Name</strong></label>
                  <input type="text"
                   placeholder="Enter Name" 
                   className="form-control"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                  />
              </div>
              <div className="mb-2">
                  <label htmlFor="email"><strong>Email</strong></label>
                  <input type="email" placeholder="Enter Email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="mb-2">
                  <label htmlFor="age"><strong>Age</strong></label>
                  <input type="number" placeholder="Enter Age" className="form-control" value={age} onChange={(e) => setAge(e.target.value)}/>
              </div>
              <button type="submit" className="btn btn-success">

                Update User
              </button>
            
          </form>
          
        </div>
      </div>
      {showUpdateModal && (
        <div className="confirm-modal-backdrop">
          <div className="confirm-modal">
            <h3>Confirm Update</h3>
            <p>Do you want to save these changes to this user?</p>
            <div className="confirm-modal-actions">
              <button type="button" className="btn-cancel" onClick={cancelUpdateUser}>Cancel</button>
              <button type="button" className="btn-confirm btn-update" onClick={confirmUpdateUser}>Update</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Update;
