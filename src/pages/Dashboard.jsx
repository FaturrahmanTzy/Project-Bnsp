import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './layout/Layout';
import { FaEdit, FaTrash, FaDownload, FaSort, FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios.get('http://127.0.0.1:3000/api/v1/')
      .then((res) => {
        setData(res.data);
        setLoading(false);
        toast.success('Data berhasil dimuat!', { position: 'top-right' });
      })
      .catch((err) => {
        console.error('Gagal ambil data:', err);
        setLoading(false);
        toast.error('Gagal memuat data!', { position: 'top-right' });
      });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Data?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      background: darkMode ? '#2c3e50' : 'white',
      color: darkMode ? 'white' : '#2c3e50'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:3000/api/v1/delete/${id}`);
        toast.success('Data berhasil dihapus!');
        fetchData();
      } catch (err) {
        console.error('Gagal menghapus data:', err);
        toast.error('Gagal menghapus data!');
      }
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
  ));


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportToCSV = () => {
    const headers = Object.keys(data[0]).join(',');
    const csvContent = data.map(item => Object.values(item).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data_pendaftar.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.info('File CSV berhasil diunduh!');
  };

  return (
    <Layout>
      {/* Animated Gradient Background */}
      <div className={`animated-bg ${darkMode ? 'dark' : ''}`}></div>

      <div className="container py-4">
        {/* Header dengan Glassmorphism */}
        <div className={`glass-card p-4 mb-4 rounded-4 ${darkMode ? 'dark-glass' : ''}`}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className={`mb-0 ${darkMode ? 'text-white' : 'text-primary'}`}>
                📄 Data Pendaftar
              </h2>
              <p className={`mb-0 ${darkMode ? 'text-light' : 'text-muted'}`}>
                Total: <strong>{data.length}</strong> pendaftar
              </p>
            </div>
            
            <div className="d-flex align-items-center">
              <button 
                onClick={toggleDarkMode} 
                className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} me-3`}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              
              <button 
                onClick={exportToCSV} 
                className="btn btn-info me-3 btn-hover"
              >
                <FaDownload /> Ekspor
              </button>
              
              <a 
                href="/pendaftaran" 
                className="btn btn-success btn-hover"
              >
                <i className="bi bi-plus-circle me-2"></i>Tambah
              </a>
            </div>
          </div>
        </div>

        <div className={`search-bar mb-4 ${darkMode ? 'dark-search' : ''}`}>
          <div className="input-group">
            <span className={`input-group-text ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className={`form-control ${darkMode ? 'bg-dark text-light border-dark' : ''}`}
              placeholder="Cari data pendaftar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>


        <div className={`main-card ${darkMode ? 'dark-card' : ''}`}>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className={`mt-3 ${darkMode ? 'text-light' : ''}`}>Memuat data...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className={`alert ${darkMode ? 'alert-dark' : 'alert-warning'} text-center`}>
              Tidak ada data yang ditemukan.
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className={`table ${darkMode ? 'table-dark' : ''} table-hover align-middle`}>
                  <thead>
                    <tr className={`${darkMode ? 'bg-gray-800' : 'table-primary'}`}>
                      <th>ID</th>
                      <th onClick={() => handleSort('nama_pendaftar')} className="sortable-header">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person-badge me-2"></i> Nama
                          <FaSort className="ms-2" />
                        </div>
                      </th>
                      <th>Alamat</th>
                      <th onClick={() => handleSort('jenis_kelamin')} className="sortable-header">
                        <div className="d-flex align-items-center">
                          Gender
                          <FaSort className="ms-2" />
                        </div>
                      </th>
                      <th>No HP</th>
                      <th onClick={() => handleSort('asal_sekolah')} className="sortable-header">
                        <div className="d-flex align-items-center">
                          Sekolah
                          <FaSort className="ms-2" />
                        </div>
                      </th>
                      <th onClick={() => handleSort('jurusan')} className="sortable-header">
                        <div className="d-flex align-items-center">
                          Jurusan
                          <FaSort className="ms-2" />
                        </div>
                      </th>
                      <th>Lahir</th>
                      <th>NISN</th>
                      <th>Dibuat</th>
                      <th>Diupdate</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((d, index) => (
                      <tr key={d.id_pendaftar} className={darkMode ? 'hover-dark' : ''}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>
                          <span className="fw-bold">{d.nama_pendaftar}</span>
                        </td>
                        <td>{d.alamat}</td>
                        <td>
                          <span className={`badge ${d.jenis_kelamin === 'Laki-laki' ? 
                            (darkMode ? 'bg-primary' : 'bg-primary') : 
                            (darkMode ? 'bg-pink' : 'bg-danger')}`}>
                            {d.jenis_kelamin}
                          </span>
                        </td>
                        <td>
                          <a href={`tel:${d.no_hp}`} className="text-decoration-none">
                            {d.no_hp}
                          </a>
                        </td>
                        <td>{d.asal_sekolah}</td>
                        <td>
                          <span className={`badge ${darkMode ? 'bg-teal' : 'bg-info'} text-dark`}>
                            {d.jurusan}
                          </span>
                        </td>
                        <td>{new Date(d.tgl_lahir).toLocaleDateString('id-ID')}</td>
                        <td>{d.nisn}</td>
                        <td>{new Date(d.createdAt).toLocaleString('id-ID')}</td>
                        <td>{new Date(d.updatedAt).toLocaleString('id-ID')}</td>
                        <td>
                          <div className="d-flex">
                            <button
                              onClick={() => navigate(`/pendaftaran/edit/${d.id_pendaftar}`)}
                              className={`btn btn-sm ${darkMode ? 'btn-warning' : 'btn-warning'} me-2 action-btn`}
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(d.id_pendaftar)}
                              className={`btn btn-sm ${darkMode ? 'btn-danger' : 'btn-danger'} action-btn`}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


              {totalPages > 1 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className={`page-link ${darkMode ? 'bg-dark text-light' : ''}`} 
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        &laquo;
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button 
                          className={`page-link ${darkMode ? 'bg-dark text-light' : ''}`}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className={`page-link ${darkMode ? 'bg-dark text-light' : ''}`}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>

      <ToastContainer theme={darkMode ? 'dark' : 'light'} />


      <style jsx global>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #6e8efb, #a777e3);
          --dark-gradient: linear-gradient(135deg, #2c3e50, #4ca1af);
        }

        body {
          transition: all 0.3s ease;
        }

        body.dark-mode {
          background-color: #1a1a1a;
          color: #f8f9fa;
        }

        .animated-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: var(--primary-gradient);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          opacity: 0.1;
        }

        .animated-bg.dark {
          background: var(--dark-gradient);
        }

        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dark-glass {
          background: rgba(0, 0, 0, 0.6) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        .main-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          padding: 20px;
          transition: all 0.3s ease;
        }

        .dark-card {
          background: #2c3e50 !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
          color: white;
        }

        .search-bar {
          transition: all 0.3s ease;
        }

        .dark-search input {
          background-color: #34495e !important;
          color: white !important;
          border-color: #2c3e50 !important;
        }

        .dark-search .input-group-text {
          background-color: #2c3e50 !important;
          color: white !important;
          border-color: #2c3e50 !important;
        }

        .sortable-header:hover {
          background: ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} !important;
        }

        .btn-hover {
          transition: all 0.3s ease;
        }

        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .action-btn {
          transition: all 0.2s ease;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px !important;
        }

        .action-btn:hover {
          transform: scale(1.1);
        }

        .hover-dark:hover {
          background: rgba(255,255,255,0.05) !important;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${darkMode ? '#2c3e50' : '#f1f1f1'};
        }

        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#6e8efb' : '#a777e3'};
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#a777e3' : '#6e8efb'};
        }

        .bg-teal {
          background-color: #20c997 !important;
        }

        .bg-pink {
          background-color: #e83e8c !important;
        }

        .bg-gray-800 {
          background-color: #343a40 !important;
        }
      `}</style>
    </Layout>
  );
}

export default App;