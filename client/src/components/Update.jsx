import React from 'react'

const Update = () => {
  return (
     <div className="d-flex vh-100 bg-primary justify-content-center align-items-center ">
      <div className="w-50 bg-white rounded p-3">
        <form>
            <h1>Update User</h1>
            <div className="mb-2">
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text" placeholder="Enter Name" className="form-control"/>
            </div>
            <div className="mb-2">
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder="Enter Email" className="form-control"/>
            </div>
            <div className="mb-2">
                <label htmlFor="age"><strong>Age</strong></label>
                <input type="number" placeholder="Enter Age" className="form-control"/>
            </div>
            <button type="submit" className="btn btn-success">
              Create User
            </button>
        </form>
        
      </div>
    </div>
  )
}

export default Update