import React, { useEffect, useState, version } from 'react';
import Navbar from "../components/Navbar";
import Select from 'react-select';
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit3, FiTrash2, FiCode, FiCalendar, FiX, FiCheck } from 'react-icons/fi';

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null); // State to store selected language

  const [isEditModelShow, setIsEditModelShow] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: state.isFocused ? '#3b82f6' : 'rgba(75, 85, 99, 0.3)',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      backdropFilter: 'blur(10px)',
      color: '#fff',
      width: "100%",
      borderRadius: '12px',
      border: '1px solid rgba(75, 85, 99, 0.3)',
      marginTop: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused 
        ? 'rgba(59, 130, 246, 0.2)' 
        : state.isSelected 
        ? 'rgba(59, 130, 246, 0.3)' 
        : 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '12px 16px',
      transition: 'all 0.2s ease',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
      fontWeight: '500',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  const getRunTimes = async () => {
    let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
    let data = await res.json();

    // Filter only the required languages
    const filteredLanguages = [
      "python",
      "javascript",
      "c",
      "c++",
      "java",
      "bash"
    ];

    const options = data
      .filter(runtime => filteredLanguages.includes(runtime.language))
      .map(runtime => ({
        label: `${runtime.language} (${runtime.version})`,
        value: runtime.language === "c++" ? "cpp" : runtime.language,
        version: runtime.version,
      }));

    setLanguageOptions(options);
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption); // Update selected language state
    console.log("Selected language:", selectedOption);
  };

  const [projects, setProjects] = useState(null);

  const getProjects = async () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("token")
      })
    }).then(res => res.json()).then(data => {
      console.log(data)
      if (data.success) {
        setProjects(data.projects);
      }
      else {
        toast.error(data.msg);
      }
    });
  };

  useEffect(() => {
    getProjects();
    getRunTimes();

    const token = localStorage.getItem("token");
    if (token) {
      fetch(api_base_url + "/getUserInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsername(data.fullName);
        } else {
          toast.error("Failed to load user info");
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Error fetching user info");
      });
    }
  }, []);

  const createProj = () => {
    fetch(api_base_url + "/createProj", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        projLanguage: selectedLanguage.value,
        token: localStorage.getItem("token"),
        version: selectedLanguage.version
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setName("");
        navigate("/editior/" + data.projectId)
      }
      else {
        toast.error(data.msg);
      }
    })
  };

  const deleteProject = (id) => {
    let conf = confirm("Are you sure you want to delete this project?");
    if (conf) {
      fetch(api_base_url + "/deleteProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectId: id,
          token: localStorage.getItem("token")
        })
      }).then(res => res.json()).then(data => {
        if (data.success) {
          getProjects();
        }
        else {
          toast.error(data.msg);
        }
      });
    }
  };

  const [editProjId, setEditProjId] = useState("");

  const updateProj = () => {
    fetch(api_base_url + "/editProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        projectId: editProjId,
        token: localStorage.getItem("token"),
        name: name,
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setIsEditModelShow(false);
        setName("");
        setEditProjId("");
        getProjects();
      }
      else {
        toast.error(data.msg);
        setIsEditModelShow(false);
        setName("");
        setEditProjId("");
        getProjects();
      }
    })
  };

  return (
    <>
      <Navbar />
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 justify-between mt-8 mb-6 gap-4">
        <div>
          <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2'>
            Welcome back, {username || "Developer"} 👋
          </h1>
          <p className='text-gray-400 text-sm sm:text-base'>Manage and create your coding projects</p>
        </div>
        <button 
          onClick={() => { setIsCreateModelShow(true) }} 
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 hover:scale-105 active:scale-100"
        >
          <FiPlus className="text-xl" />
          <span>Create Project</span>
        </button>
      </div>

      {/* Projects Container */}
      <div className="projects px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 mt-5 pb-10">

        {
          projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {projects.map((project, index) => {
                const languageIcons = {
                  python: "https://images.ctfassets.net/em6l9zw4tzag/oVfiswjNH7DuCb7qGEBPK/b391db3a1d0d3290b96ce7f6aacb32b0/python.png",
                  javascript: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
                  cpp: "https://upload.wikimedia.org/wikipedia/commons/3/32/C%2B%2B_logo.png",
                  c: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png",
                  java: "https://static-00.iconduck.com/assets.00/java-icon-1511x2048-6ikx8301.png",
                  bash: "https://img.icons8.com/color/512/bash.png"
                };

                return (
                  <div 
                    key={project._id}
                    className="project group relative bg-gradient-to-br from-dark-900 to-dark-800 rounded-2xl p-6 border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10"
                  >
                    {/* Language Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-xl bg-dark-800 p-3 flex items-center justify-center border border-gray-700/50 group-hover:border-blue-500/50 transition-all">
                        <img 
                          className='w-full h-full object-contain' 
                          src={languageIcons[project.projLanguage] || languageIcons.python} 
                          alt={project.projLanguage} 
                        />
                      </div>
                      <div className="flex gap-2">
                        <button 
                          className="p-2 rounded-lg bg-dark-800 hover:bg-blue-600 text-gray-400 hover:text-white transition-all border border-gray-700/50 hover:border-blue-500/50"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsEditModelShow(true);
                            setEditProjId(project._id);
                            setName(project.name);
                          }}
                          aria-label="Edit project"
                        >
                          <FiEdit3 className="text-lg" />
                        </button>
                        <button 
                          className="p-2 rounded-lg bg-dark-800 hover:bg-red-600 text-gray-400 hover:text-white transition-all border border-gray-700/50 hover:border-red-500/50"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProject(project._id);
                          }}
                          aria-label="Delete project"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div 
                      onClick={() => { navigate("/editior/" + project._id) }} 
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FiCode className="text-blue-400 text-lg" />
                        <h3 className='text-xl font-bold text-white group-hover:text-blue-400 transition-colors'>
                          {project.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                        <FiCalendar className="text-sm" />
                        <span>{new Date(project.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold uppercase">
                          {project.projLanguage}
                        </span>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 rounded-full bg-dark-800 flex items-center justify-center mb-6 border border-gray-700/50">
                <FiCode className="text-4xl text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No Projects Yet</h3>
              <p className="text-gray-500 mb-6 max-w-md">Get started by creating your first project. Click the button above to begin!</p>
              <button 
                onClick={() => { setIsCreateModelShow(true) }} 
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30"
              >
                <FiPlus className="text-xl" />
                <span>Create Your First Project</span>
              </button>
            </div>
          )
        }
      </div>

      {
        isCreateModelShow &&
        <div onClick={(e) => {
          if (e.target.classList.contains("modelCon")) {
            setIsCreateModelShow(false);
            setName("");
            setSelectedLanguage(null);
          }
        }} className='modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 z-50'>
          <div className="modelBox flex flex-col items-start rounded-2xl p-6 sm:p-8 w-full sm:w-[90vw] md:w-[500px] h-[auto] bg-gradient-to-br from-dark-900 to-dark-800 mx-4 border border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between w-full mb-6">
              <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                Create New Project
              </h3>
              <button
                onClick={() => {
                  setIsCreateModelShow(false);
                  setName("");
                  setSelectedLanguage(null);
                }}
                className="p-2 rounded-lg hover:bg-dark-800 text-gray-400 hover:text-white transition-all"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <div className="w-full space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
                <div className="inputBox">
                  <input 
                    onChange={(e) => { setName(e.target.value) }} 
                    value={name} 
                    type="text" 
                    placeholder='Enter your project name' 
                    className="w-full" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Programming Language</label>
                <Select
                  placeholder="Select a Language"
                  options={languageOptions}
                  styles={customStyles}
                  onChange={handleLanguageChange}
                />
              </div>
              
              {selectedLanguage && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                  <FiCheck className="text-green-400 text-lg" />
                  <p className="text-sm text-green-400 font-medium">
                    Selected: <span className="text-white">{selectedLanguage.label}</span>
                  </p>
                </div>
              )}
              
              <button 
                onClick={createProj} 
                disabled={!name || !selectedLanguage}
                className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 flex items-center justify-center gap-2"
              >
                <FiPlus className="text-lg" />
                <span>Create Project</span>
              </button>
            </div>
          </div>
        </div>
      }

      {
        isEditModelShow &&
        <div onClick={(e) => {
          if (e.target.classList.contains("modelCon")) {
            setIsEditModelShow(false);
            setName("");
            setEditProjId("");
          }
        }} className='modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 z-50'>
          <div className="modelBox flex flex-col items-start rounded-2xl p-6 sm:p-8 w-full sm:w-[90vw] md:w-[500px] h-[auto] bg-gradient-to-br from-dark-900 to-dark-800 mx-4 border border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between w-full mb-6">
              <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                Update Project
              </h3>
              <button
                onClick={() => {
                  setIsEditModelShow(false);
                  setName("");
                  setEditProjId("");
                }}
                className="p-2 rounded-lg hover:bg-dark-800 text-gray-400 hover:text-white transition-all"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <div className="w-full space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
                <div className="inputBox">
                  <input 
                    onChange={(e) => { setName(e.target.value) }} 
                    value={name} 
                    type="text" 
                    placeholder='Enter your project name' 
                    className="w-full" 
                  />
                </div>
              </div>

              <button 
                onClick={updateProj} 
                disabled={!name}
                className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 flex items-center justify-center gap-2"
              >
                <FiCheck className="text-lg" />
                <span>Update Project</span>
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Home;
