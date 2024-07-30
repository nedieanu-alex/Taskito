import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../api/context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="flex space-x-4">
        <Link className="hover:text-gray-300" to="/">Home</Link>
        {user ? (
          <>
            <Link className="hover:text-gray-300" to="/tasks">Tasks</Link>
            <button onClick={logout} className="hover:text-gray-300">Logout</button>
          </>
        ) : (
          <>
            <Link className="hover:text-gray-300" to="/login">Login</Link>
            <Link className="hover:text-gray-300" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
