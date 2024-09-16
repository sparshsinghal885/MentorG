import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashBoard = () => {
  return (
    <div>
      this is admin dashboard
      <br />
      <Link to="/add-topic">add topic</Link>
    </div>
  )
}

export default AdminDashBoard
