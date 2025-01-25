import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { FaSearch, FaUser, FaFileAlt, FaClipboardCheck, FaPlus, FaBell } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import logo from '../img/WhatsApp Image 2025-01-24 at 00.39.45.jpeg';  // Importando a imagem


const mockUser = {
  email: "flavio1508@gmail.com",
  password: "1234",
  name: "Flávio Augusto",
};

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = () => {
      if (email === mockUser.email && password === mockUser.password) {
        localStorage.setItem("user", JSON.stringify(mockUser));
        navigate("/dashboard");
      } else {
        setError("Email ou senha incorretos!");
      }
    };
  
    return (
      <div className="login-container">
        <div className="login-box">
        <div className="login-logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
          <h1 className="login-title">Login</h1>
          {error && <p className="login-error">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>
    );
  }
  

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, [user]);

  const handleAddProject = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveProject = () => {
    if (newProject.name && newProject.description) {
      const newProjectObj = { id: projects.length + 1, ...newProject };
      setProjects([...projects, newProjectObj]);
      setIsModalOpen(false);
      setNewProject({ name: "", description: "" });
    }
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleEditProject = (id) => {
    const projectToEdit = projects.find((project) => project.id === id);
    setNewProject({ name: projectToEdit.name, description: projectToEdit.description });
    setIsModalOpen(true);
    handleDeleteProject(id);
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1>Simplus</h1>
        <ul>
          <li>
            <FaUser /> Profile: {user?.name}
          </li>
          <li>
            <FaFileAlt /> History
          </li>
          <li>
            <FaClipboardCheck /> Projects
          </li>
          <li>
            <FaPlus /> Users
          </li>
          <li>
            <FaBell /> Notification
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <div className="header">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button>
              <FaSearch />
            </button>
          </div>
          <button
            onClick={handleAddProject}
            className="new-project-btn"
          >
            <span className="text-lg mr-2">+</span> New Project
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2 className="text-xl font-bold mb-4">Novo Projeto</h2>
              <input
                type="text"
                placeholder="Nome do Projeto"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
              <textarea
                placeholder="Descrição do Projeto"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <button onClick={handleSaveProject}>Salvar</button>
              <button onClick={handleModalClose} className="mt-2">Cancelar</button>
            </div>
          </div>
        )}

        {/* Project Cards */}
        <div className="grid-container">
          {paginatedProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-card-header"></div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="card-options">
                <span onClick={() => handleEditProject(project.id)}>Editar</span>
                <span onClick={() => handleDeleteProject(project.id)}>Excluir</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <i className="fa fa-arrow-left"></i>
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredProjects.length}
          >
            <i className="fa fa-arrow-right"></i>
          </button>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
