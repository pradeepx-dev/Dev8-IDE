import React, { useEffect, useState, version } from 'react';
import Navbar from "../components/Navbar";
import Select from 'react-select';
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null); // State to store selected language

  const [isEditModelShow, setIsEditModelShow] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#000',
      borderColor: '#555',
      color: '#fff',
      padding: '5px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#000',
      color: '#fff',
      width: "100%"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#333' : '#000',
      color: '#fff',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaa',
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
      {/* Responsive padding for different screen sizes */}
      <div className="flex flex-col sm:flex-row items-center px-4 sm:px-6 md:px-10 lg:px-[100px] justify-between mt-5 font-medium">
        <h3 className='text-xl sm:text-2xl mb-4 sm:mb-0'>Hi, {username || "User"}</h3>
        <div className="flex items-center">
          <button onClick={() => { setIsCreateModelShow(true) }} className="btnNormal bg-blue-500 transition-all hover:bg-blue-600">Create Project</button>
        </div>
      </div>

      {/* Responsive padding for projects container */}
      <div className="projects px-4 sm:px-6 md:px-10 lg:px-[100px] mt-5 pb-10">

        {
          projects && projects.length > 0 ? projects.map((project, index) => {
            return <>
              {/* Responsive project card */}
              <div className="project w-full p-3 sm:p-[15px] flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#111827] rounded-lg shadow-md border border-gray-800 mb-4">
                <div onClick={() => { navigate("/editior/" + project._id) }} className='flex flex-col sm:flex-row w-full items-center gap-2 sm:gap-[15px]'>
                  {
                    project.projLanguage === "python" ?
                      <>
                        <img className='w-16 h-16 sm:w-[90px] sm:h-[80px] md:w-[130px] md:h-[100px] object-cover' src="https://images.ctfassets.net/em6l9zw4tzag/oVfiswjNH7DuCb7qGEBPK/b391db3a1d0d3290b96ce7f6aacb32b0/python.png" alt="" />
                      </>
                      : project.projLanguage === "javascript" ?
                        <>
                          <img className='w-16 h-16 sm:w-[90px] sm:h-[80px] md:w-[90px] md:h-[100px] object-cover sm:mr-[20px] sm:ml-[20px]' src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="" />
                        </> : project.projLanguage === "cpp" ?
                          <>
                            <img className='w-16 h-16 sm:w-[90px] sm:h-[80px] md:w-[90px] md:h-[100px] object-cover sm:mr-[20px] sm:ml-[20px]' src="https://upload.wikimedia.org/wikipedia/commons/3/32/C%2B%2B_logo.png" alt="" />
                          </> : project.projLanguage === "c" ?
                            <>
                              <img className='w-16 h-16 sm:w-[90px] sm:h-[80px] md:w-[90px] md:h-[100px] object-cover sm:mr-[20px] sm:ml-[20px]' src="https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png" alt="" />
                            </> : project.projLanguage === "java" ?
                              <>
                                <img className='w-16 h-16 sm:w-[90px] sm:h-[80px] md:w-[90px] md:h-[100px] object-cover sm:mr-[20px] sm:ml-[20px]' src="https://static-00.iconduck.com/assets.00/java-icon-1511x2048-6ikx8301.png" alt="" />
                              </> : project.projLanguage === "bash" ?
                                <>
                                  <img className='w-16 h-16 sm:w-[90px] sm:h-[80px] md:w-[90px] md:h-[100px] object-cover sm:mr-[20px] sm:ml-[20px]' src="https://img.icons8.com/color/512/bash.png" alt="" />
                                </> : ""
                  }
                  <div className='font-medium text-center sm:text-left mt-2 sm:mt-0'>
                    <h3 className='text-lg sm:text-xl'>{project.name}</h3>
                    <p className='text-xs sm:text-[14px] text-[gray]'>{new Date(project.date).toDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-[15px] font-medium w-full sm:w-auto justify-center sm:justify-end mt-4 sm:mt-0">
                  <button className="btnNormal bg-blue-500 transition-all hover:bg-blue-600" onClick={() => {
                    setIsEditModelShow(true);
                    setEditProjId(project._id);
                    setName(project.name);
                  }}>Edit</button>
                  <button onClick={() => { deleteProject(project._id) }} className="btnNormal bg-red-500 transition-all hover:bg-red-600">Delete</button>
                </div>
              </div>
            </>
          }) : "No Project Found !"
        }
      </div>

      {
        isCreateModelShow &&
        <div onClick={(e) => {
          if (e.target.classList.contains("modelCon")) {
            setIsCreateModelShow(false);
            setName("");
          }
        }} className='modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]'>
          <div className="modelBox flex flex-col items-start rounded-xl p-[20px] w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[25vw] h-[auto] bg-[#1F2937] mx-4">
            <h3 className='text-xl font-bold text-center w-full'>Create Project</h3>
            <div className="inputBox w-full">
              <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" placeholder='Enter your project name' className="text-black w-full" />
            </div>
            <div className="w-full">
              <Select
                placeholder="Select a Language"
                options={languageOptions}
                styles={customStyles}
                onChange={handleLanguageChange} // Handle language selection
              />
            </div>
            {selectedLanguage && (
              <>
                <p className="text-[14px] text-green-500 mt-2">
                  Selected Language: {selectedLanguage.label}
                </p>
                <button onClick={createProj} className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2">Create</button>
              </>
            )}
          </div>
        </div>
      }

      {
        isEditModelShow &&
        <div onClick={(e) => {
          if (e.target.classList.contains("modelCon")) {
            setIsEditModelShow(false);
            setName("");
          }
        }} className='modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]'>
          <div className="modelBox flex flex-col items-start rounded-xl p-[20px] w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[25vw] h-[auto] bg-[#1F2937] mx-4">
            <h3 className='text-xl font-bold text-center w-full'>Update Project</h3>
            <div className="inputBox w-full">
              <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" placeholder='Enter your project name' className="text-black w-full" />
            </div>

            <button onClick={updateProj} className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2">Update</button>

          </div>
        </div>
      }
    </>
  );
};

export default Home;
