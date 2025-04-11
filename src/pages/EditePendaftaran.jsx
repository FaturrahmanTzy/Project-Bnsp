import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaUser, FaVenusMars, FaMapMarkerAlt, FaPhone, FaSchool, FaBook, FaBirthdayCake, FaIdCard, FaSave } from 'react-icons/fa';
import Layout from './layout/Layout';
import { FaMoon, FaSun } from 'react-icons/fa';

const EditPendaftaran = () => {
  const [formData, setFormData] = useState({
    nama_pendaftar: '',
    jenis_kelamin: '',
    alamat: '',
    no_hp: '',
    asal_sekolah: '',
    jurusan: '',
    tgl_lahir: '',
    nisn: ''
  });

  const [errors, setErrors] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://fatur.rikpetik.site/api/v1/${id}`);
        setFormData({
          ...res.data,
          tgl_lahir: res.data.tgl_lahir?.slice(0, 10) // Format date for input
        });
        setLoading(false);
      } catch (err) {
        console.error('Gagal ambil data:', err);
        Swal.fire({
          title: "Error!",
          text: "Gagal memuat data pendaftar",
          icon: "error",
          confirmButtonText: "OK",
          background: darkMode ? '#2c3e50' : 'white',
          color: darkMode ? 'white' : '#2c3e50'
        });
        navigate('/');
      }
    };

    fetchData();
  }, [id, darkMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  
    if (errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    const { nama_pendaftar, jenis_kelamin, alamat, no_hp, asal_sekolah, jurusan, tgl_lahir, nisn } = formData;

    if (!nama_pendaftar) newErrors.nama_pendaftar = "Nama lengkap tidak boleh kosong";
    else if (nama_pendaftar.length < 3) newErrors.nama_pendaftar = "Nama lengkap minimal 3 karakter";
    else if (/\d/.test(nama_pendaftar)) newErrors.nama_pendaftar = "Nama tidak boleh mengandung angka";

    if (!jenis_kelamin) newErrors.jenis_kelamin = "Jenis kelamin tidak boleh kosong";

    if (!alamat) newErrors.alamat = "Alamat tidak boleh kosong";
    else if (alamat.length < 5) newErrors.alamat = "Alamat minimal 5 karakter";

    if (!no_hp) newErrors.no_hp = "No HP tidak boleh kosong";
    else if (!/^\d{10,15}$/.test(no_hp)) newErrors.no_hp = "No HP tidak valid, harus 10-15 digit angka";

    if (!asal_sekolah) newErrors.asal_sekolah = "Asal sekolah tidak boleh kosong";
    else if (asal_sekolah.length < 3) newErrors.asal_sekolah = "Asal sekolah minimal 3 karakter";

    if (!jurusan) newErrors.jurusan = "Jurusan tidak boleh kosong";
    else if (jurusan.length < 2) newErrors.jurusan = "Jurusan minimal 2 karakter";

    if (!tgl_lahir) {
      newErrors.tgl_lahir = "Tanggal lahir tidak boleh kosong";
    } else {
      const lahir = new Date(tgl_lahir);
      const hariIni = new Date();
      const usia = hariIni.getFullYear() - lahir.getFullYear();
      const bulan = hariIni.getMonth() - lahir.getMonth();
      const tanggal = hariIni.getDate() - lahir.getDate();
    
      if (usia < 10 || (usia === 10 && (bulan < 0 || (bulan === 0 && tanggal < 0)))) {
        newErrors.tgl_lahir = "Usia minimal harus 10 tahun";
      } else if (lahir > hariIni) {
        newErrors.tgl_lahir = "Tanggal lahir tidak valid";
      }
    }


    if (!nisn) newErrors.nisn = "NISN tidak boleh kosong";
    else if (!/^\d{10}$/.test(nisn)) newErrors.nisn = "NISN harus 10 digit angka";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      Swal.fire({
        title: "Error!",
        text: "Ada kesalahan pada input data, silakan periksa kembali!",
        icon: "error",
        confirmButtonText: "OK",
        background: darkMode ? '#2c3e50' : 'white',
        color: darkMode ? 'white' : '#2c3e50'
      });
      return;
    }

    const result = await Swal.fire({
      title: "Konfirmasi Update",
      text: "Apakah data yang dimasukkan sudah benar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Ya, Update!",
      cancelButtonText: "Periksa Kembali",
      background: darkMode ? '#2c3e50' : 'white',
      color: darkMode ? 'white' : '#2c3e50'
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.put(`https://fatur.rikpetik.site/api/v1/update/${id}`, formData);
        Swal.fire({
          title: "Sukses!",
          text: "Data berhasil diperbarui.",
          icon: "success",
          confirmButtonText: "OK",
          background: darkMode ? '#2c3e50' : 'white',
          color: darkMode ? 'white' : '#2c3e50'
        });
        console.log(res.data);
        navigate('/');
      } catch (err) {
        console.error('Gagal memperbarui data:', err);
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat memperbarui data.",
          icon: "error",
          confirmButtonText: "OK",
          background: darkMode ? '#2c3e50' : 'white',
          color: darkMode ? 'white' : '#2c3e50'
        });
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className={`mt-3 ${darkMode ? 'text-light' : ''}`}>Memuat data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className={`animated-bg ${darkMode ? 'dark' : ''}`}></div>

      <div className="container py-4">
        <div className={`glass-card p-4 mb-4 rounded-4 ${darkMode ? 'dark-glass' : ''}`}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className={`mb-0 ${darkMode ? 'text-white' : 'text-primary'}`}>
                ✏️ Edit Data Pendaftar
              </h2>
              <p className={`mb-0 ${darkMode ? 'text-light' : 'text-muted'}`}>
                ID Pendaftar: {id}
              </p>
            </div>
            
            <button 
              onClick={toggleDarkMode} 
              className={`btn ${darkMode ? 'btn-light' : 'btn-dark'}`}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>

        <div className={`main-card ${darkMode ? 'dark-card' : ''}`}>
          <form onSubmit={handleSubmit}>

            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className={`form-label ${darkMode ? 'text-light' : ''}`}>
                    <FaUser className="me-2" /> Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="nama_pendaftar"
                    className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                    value={formData.nama_pendaftar}
                    onChange={handleChange}
                  />
                  {errors.nama_pendaftar && <div className="text-danger small mt-1">{errors.nama_pendaftar}</div>}
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className={`form-label ${darkMode ? 'text-light' : ''}`}>
                    <FaVenusMars className="me-2" /> Jenis Kelamin
                  </label>
                  <select 
                    name="jenis_kelamin" 
                    className={`form-select ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                    value={formData.jenis_kelamin}
                    onChange={handleChange}
                  >
                    <option value="">-- Pilih Jenis Kelamin --</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                  {errors.jenis_kelamin && <div className="text-danger small mt-1">{errors.jenis_kelamin}</div>}
                </div>
              </div>
            </div>

  
            <div className="mb-4">
              <div className="form-group">
                <label className={`form-label ${darkMode ? 'text-light' : ''}`}>
                  <FaMapMarkerAlt className="me-2" /> Alamat Lengkap
                </label>
                <textarea
                  name="alamat"
                  className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  rows="3"
                  value={formData.alamat}
                  onChange={handleChange}
                ></textarea>
                {errors.alamat && <div className="text-danger small mt-1">{errors.alamat}</div>}
              </div>
            </div>


            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className={`form-label ${darkMode ? 'text-light' : ''}`}>
                    <FaPhone className="me-2" /> Nomor Handphone
                  </label>
                  <input
                    type="text"
                    name="no_hp"
                    className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                    value={formData.no_hp}
                    onChange={handleChange}
                  />
                  {errors.no_hp && <div className="text-danger small mt-1">{errors.no_hp}</div>}
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className={`form-label ${darkMode ? 'text-light' : ''}`}>
                    <FaSchool className="me-2" /> Asal Sekolah
                  </label>
                  <input
                    type="text"
                    name="asal_sekolah"
                    className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                    value={formData.asal_sekolah}
                    onChange={handleChange}
                  />
                  {errors.asal_sekolah && <div className="text-danger small mt-1">{errors.asal_sekolah}</div>}
                </div>
              </div>
            </div>


            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className={`form-label ${darkMode ? 'text-light' : ''}`}>
                    <FaBook className="me-2" /> Jurusan
                  </label>
                  <input
                    type="text"
                    name="jurusan"
                    className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                    value={formData.jurusan}
                    onChange={handleChange}
                  />
                  {errors.jurusan && <div className="text-danger small mt-1">{errors.jurusan}</div>}
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label className={`form-label ${darkMode ? 'text-light' : ''}`}>
                    <FaBirthdayCake className="me-2" /> Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    name="tgl_lahir"
                    className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                    value={formData.tgl_lahir}
                    onChange={handleChange}
                  />
                  {errors.tgl_lahir && <div className="text-danger small mt-1">{errors.tgl_lahir}</div>}
                </div>
              </div>
            </div>


            <div className="mb-4">
              <div className="form-group">
                <label className={`form-label ${darkMode ? 'text-light' : ''}`}>
                  <FaIdCard className="me-2" /> NISN
                </label>
                <input
                  type="text"
                  name="nisn"
                  className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                  value={formData.nisn}
                  onChange={handleChange}
                />
                {errors.nisn && <div className="text-danger small mt-1">{errors.nisn}</div>}
              </div>
            </div>

  
            <div className="d-grid gap-2">
              <button 
                type="submit" 
                className="btn btn-primary btn-hover py-2"
              >
                <FaSave className="me-2" /> Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>


      <style jsx global>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #6e8efb, #a777e3);
          --dark-gradient: linear-gradient(135deg, #2c3e50, #4ca1af);
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
          padding: 30px;
          transition: all 0.3s ease;
        }

        .dark-card {
          background: #2c3e50 !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
          color: white;
        }

        .form-control:focus, .form-select:focus {
          border-color: #6e8efb;
          box-shadow: 0 0 0 0.25rem rgba(110, 142, 251, 0.25);
        }

        .btn-hover {
          transition: all 0.3s ease;
          border-radius: 8px;
        }

        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
      `}</style>
    </Layout>
  );
};

export default EditPendaftaran;