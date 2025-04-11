import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      {/* Animated Background */}
      <div className="error-bg"></div>
      
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="error-content p-5 rounded-4 shadow-lg"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, -5, 5, 0],
            scale: [1, 1.1, 1.1, 1.1, 1]
          }}
          transition={{ 
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1]
          }}
          className="error-icon mb-4"
        >
          <FaExclamationTriangle size={80} className="text-danger" />
        </motion.div>

        <h1 className="display-1 fw-bold text-gradient mb-3">404</h1>
        <h2 className="fs-2 mb-3">Oops! Halaman Tidak Ditemukan</h2>
        <p className="fs-5 mb-4">
          Sepertinya kamu tersesat di lautan digital... <br />
          Halaman yang kamu cari mungkin sudah dipindahkan atau tidak tersedia.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary btn-lg mt-3 px-4 py-2 rounded-pill"
          onClick={() => navigate('/')}
        >
          <FaHome className="me-2" /> Kembali ke Beranda
        </motion.button>
      </motion.div>

      {/* Custom Styles */}
      <style jsx>{`
        .error-page {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        }
        
        .error-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
          animation: bgMove 60s linear infinite;
        }
        
        .error-content {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          max-width: 600px;
          width: 90%;
        }
        
        .error-icon {
          display: inline-block;
        }
        
        .text-gradient {
          background: linear-gradient(45deg, #ff4d4d, #f95700);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        @keyframes bgMove {
          0% { background-position: 0 0; }
          100% { background-position: 1000px 1000px; }
        }
        
        body.dark-mode .error-page {
          background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
        }
        
        body.dark-mode .error-content {
          background: rgba(30, 30, 30, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: #f8f9fa;
        }
        
        body.dark-mode .error-bg {
          opacity: 0.1;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;