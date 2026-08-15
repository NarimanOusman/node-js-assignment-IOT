import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getUsers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error.message);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/deleteUser/${id}`)
      .then((res) => {
        console.log(res);
        setUsers(users.filter(user => user._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center ">
      <div className="w-50 bg-white rounded p-3">

        <Link to="/create" className="btn btn-primary mb-3">
          Add User
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  
                  <Link to={`/update/${user._id}`} className="btn btn-success">
                    Edit
                  </Link>
                  <button className="btn btn-danger" onClick={(e)=>{handleDelete(user._id)}}>Delete</button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
