import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div>
        <Link to="/" />
        <Link to="/about" />
      </div>
    </div>
  )
}

export default Navbar
