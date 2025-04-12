import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  FaTachometerAlt, 
  FaUserPlus, 
} from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import "./sidebar.css"; // Assuming you have a CSS file for additional styles

const Sidebar = () => {
  // State for dropdown menus
  const [openMenus, setOpenMenus] = React.useState({
    pendaftaran: false,
    laporan: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <div className="bg-white p-4 border-end" style={{ 
      width: '280px', 
      minHeight: '100vh',
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Header with logo and title */}
      <div className="d-flex align-items-center justify-content-start mb-4 ps-3">
        <div className="bg-primary p-2 rounded me-3 d-flex align-items-center justify-content-center" 
          style={{ 
            width: '40px', 
            height: '40px',
            background: 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)'
          }}>
          <h4 className="text-white m-0">📋</h4>
        </div>
        <div>
          <h4 className="text-dark m-0 fw-bold">PSB Panel</h4>
          <small className="text-muted">Admin Dashboard</small>
        </div>
      </div>
      
      <hr className="my-2" />
      
      {/* Main Navigation */}
      <ul className="nav flex-column mt-4">
        <li className="nav-item mb-1">
          <NavLink 
            to="/" 
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => ({
              fontWeight: isActive ? '600' : '500',
              color: isActive ? '#0d6efd' : '#4a5568',
              backgroundColor: isActive ? 'rgba(13, 110, 253, 0.1)' : 'transparent',
              borderRadius: '8px',
              padding: '12px 15px',
              transition: 'all 0.3s ease',
              borderLeft: isActive ? '3px solid #0d6efd' : '3px solid transparent'
            })}
          >
            <div className="icon-container" style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              backgroundColor: 'rgba(13, 110, 253, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <FaTachometerAlt className="text-primary" style={{ width: '16px' }} />
            </div>
            <span>Dashboard</span>
          </NavLink>
        </li>

        

        {/* Laporan */}
        <li className="nav-item mb-1">
          <NavLink 
            to="/pendaftaran" 
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => ({
              fontWeight: isActive ? '600' : '500',
              color: isActive ? '#0d6efd' : '#4a5568',
              backgroundColor: isActive ? 'rgba(13, 110, 253, 0.1)' : 'transparent',
              borderRadius: '8px',
              padding: '12px 15px',
              transition: 'all 0.3s ease',
              borderLeft: isActive ? '3px solid #0d6efd' : '3px solid transparent'
            })}
          >
            <div className="icon-container" style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              backgroundColor: 'rgba(153, 102, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <FaUserPlus className="text-success" style={{ width: '16px' }} />
              </div>
              <span>Pendaftaran</span>
          </NavLink>
        </li>

      </ul>

      {/* Bottom section */}
      <div className="position-absolute bottom-0 start-0 p-4 w-100">
        <hr className="my-2" />
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className="bg-light rounded-circle me-2" style={{ 
              width: '40px', 
              height: '40px',
              backgroundImage: 'url(https://randomuser.me/api/portraits/men/32.jpg)',
              backgroundSize: 'cover'
            }}></div>
            <div>
              <h6 className="mb-0 fw-bold">Admin User</h6>
              <small className="text-muted">Super Admin</small>
            </div>
          </div>
          <button className="btn btn-sm btn-outline-danger">
            <RiLogoutBoxRLine />
          </button>
        </div>
      </div>

      {/* Add some global styles for animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .nav-link:hover {
          background-color: rgba(13, 110, 253, 0.05) !important;
        }
        
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;