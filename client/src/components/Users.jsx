import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import '../components/User.css'
import API_BASE_URL from '../config/api.js'

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 25;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/getUsers`)
      .then((response) => {
        setUsers(response.data);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error("Error fetching users:", error.message);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${API_BASE_URL}/deleteUser/${id}`)
      .then((res) => {
        console.log(res);
        setUsers((currentUsers) => currentUsers.filter((user) => user._id !== id));
        setShowDeleteModal(false);
        setSelectedUser(null);
        setCurrentPage(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };




const totalUsers = users.length;
const averageAge = users.reduce((sum, user) => sum + user.age, 0) / totalUsers || 0;
const roundedAverageAge = Math.round(averageAge * 10) / 10;

const [searchQuery, setSearchQuery] = useState("");
const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

// Pagination logic
const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
const startIndex = (currentPage - 1) * usersPerPage;
const endIndex = startIndex + usersPerPage;
const currentUsers = filteredUsers.slice(startIndex, endIndex);

const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
  setCurrentPage(1);
};

const handleNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const handlePreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

  return (
  <div>

           
            <h2 className="header">User Management Dashboard</h2>
            <p className="dashboard-intro">
              Track registered users, monitor activity at a glance, and manage records<br></br> from one clean dashboard view.
            </p>
            {/* --- DASHBOARD SUMMARY CARDS --- */}
    {/* --- DASHBOARD SUMMARY CARDS --- */}
      <div className="cards-wrapper px-4">
        <div className="cards-holder">
          
          {/* Card 1: Total Users */}
          <div className="dashboard-card card-primary">
            <div className="card-body">
              <h6 className="card-subtitle">Total Registered Users</h6>
              <h2 className="card-value">{totalUsers}</h2>
            </div>
          </div>

          {/* Card 2: Average Age */}
          <div className="dashboard-card card-success">
            <div className="card-body">
              <h6 className="card-subtitle">Average Age</h6>
              <h2 className="card-value">
                {roundedAverageAge} <span className="card-unit">yrs</span>
              </h2>
            </div>
          </div>

        </div>
      </div>
           

{/* --- TABLE & SEARCH CONTAINER --- */}
      <div className="table-section-wrapper">
        <div className="table-card">
          
          {/* Top Control Bar: Search Input & Add Button */}
          <div className="table-control-bar">
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Link to="/create" className="btn-add-user">
              + Add User
            </Link>
          </div>

          {/* User Table */}
          <div className="table-responsive">
            <table className="table custom-dashboard-table align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user._id}>
                      <td className="fw-semibold text-dark">{user.name}</td>
                      <td className="text-muted">{user.email}</td>
                      <td>{user.age}</td>
                      <td className="text-end">
                        <Link to={`/update/${user._id}`} className="btn-action btn-edit me-2 action-icon-btn" aria-label="Edit user">
                          <Icon icon="mdi:pencil-outline" className="action-icon" />
                        </Link>
                        <button className="btn-action btn-delete action-icon-btn" onClick={() => openDeleteModal(user)} aria-label="Delete user">
                          <Icon icon="mdi:trash-can-outline" className="action-icon" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button 
                className="btn-pagination"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                className="btn-pagination"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}

        </div>
      </div>

      {showDeleteModal && selectedUser && (
        <div className="confirm-modal-backdrop">
          <div className="confirm-modal">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete <strong>{selectedUser.name}</strong>? This action cannot be undone.
            </p>
            <div className="confirm-modal-actions">
              <button className="btn-cancel" onClick={closeDeleteModal}>Cancel</button>
              <button className="btn-confirm btn-delete" onClick={() => handleDelete(selectedUser._id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
