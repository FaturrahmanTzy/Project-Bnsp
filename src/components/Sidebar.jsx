import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  FaTachometerAlt, 
  FaUserPlus, 
  FaCog, 
  FaChartBar, 
  FaFileAlt,
  FaBell
} from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';

const Sidebar = () => {
  return (
    <div className="bg-white p-4 border-end" style={{ 
      width: '280px', 
      minHeight: '100vh',
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
    }}>
      {/* Header with logo and title */}
      <div className="d-flex align-items-center justify-content-start mb-4 ps-3">
        <div className="bg-primary p-2 rounded me-3" style={{ width: '40px', height: '40px' }}>
          <h4 className="text-white m-0 text-center">📋</h4>
        </div>
        <h4 className="text-dark m-0 fw-bold">PSB Panel</h4>
      </div>
      
      <hr className="my-2" />
      
      {/* Main Navigation */}
      <ul className="nav flex-column mt-4">
        <li className="nav-item mb-1">
          <NavLink 
            to="/" 
            className="nav-link d-flex align-items-center text-dark"
            style={({ isActive }) => ({
              fontWeight: isActive ? '600' : '400',
              color: isActive ? '#0d6efd' : '#4a5568',
              backgroundColor: isActive ? '#f0f7ff' : 'transparent',
              borderRadius: '8px',
              padding: '10px 15px',
              transition: 'all 0.2s ease'
            })}
          >
            <FaTachometerAlt className="me-3" style={{ width: '20px' }} />
            <span>Dashboard</span>
            {({ isActive }) => isActive && (
              <span className="ms-auto bg-primary" style={{
                width: '4px',
                height: '20px',
                borderRadius: '2px'
              }}></span>
            )}
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <NavLink 
            to="/pendaftaran" 
            className="nav-link d-flex align-items-center text-dark"
            style={({ isActive }) => ({
              fontWeight: isActive ? '600' : '400',
              color: isActive ? '#0d6efd' : '#4a5568',
              backgroundColor: isActive ? '#f0f7ff' : 'transparent',
              borderRadius: '8px',
              padding: '10px 15px',
              transition: 'all 0.2s ease'
            })}
          >
            <FaUserPlus className="me-3" style={{ width: '20px' }} />
            <span>Pendaftaran</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;