import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Editor2 from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';
import { FiSave, FiPlay, FiRotateCcw, FiTerminal, FiCode, FiCheckCircle } from 'react-icons/fi';

const Editor = () => {
  const [code, setCode] = useState(""); // State to hold the code
  const { id } = useParams(); // Extract project ID from URL params
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);

  const [data, setData] = useState(null);

  // Fetch project data on mount
  useEffect(() => {
    fetch(`${api_base_url}/getProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCode(data.project.code); // Set the fetched code
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error fetching project:', err);
        toast.error('Failed to load project.');
      });
  }, [id]);

  // Save project function
  const saveProject = useCallback(() => {
    const trimmedCode = code?.toString().trim(); // Ensure code is a string and trimmed
    console.log('Saving code:', trimmedCode); // Debug log

    fetch(`${api_base_url}/saveProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
        code: trimmedCode, // Use the latest code state
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error saving project:', err);
        toast.error('Failed to save the project.');
      });
  }, [code, id]);

  // Add and clean up keyboard event listener for Ctrl+S
  useEffect(() => {
    const handleSaveShortcut = (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); // Prevent browser's default save behavior
        saveProject(); // Call the save function
      }
    };

    window.addEventListener('keydown', handleSaveShortcut);
    return () => {
      window.removeEventListener('keydown', handleSaveShortcut);
    };
  }, [saveProject]); // Include saveProject in dependencies

  const runProject = () => {
    if (!data) {
      toast.error('Project data not loaded');
      return;
    }

    // Get file extension based on language
    const getFileExtension = (lang) => {
      const extensions = {
        python: '.py',
        java: '.java',
        javascript: '.js',
        c: '.c',
        cpp: '.cpp',
        bash: '.sh'
      };
      return extensions[lang] || '';
    };

    const filename = `${data.name}${getFileExtension(data.projLanguage)}`;

    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        language: data.projLanguage,
        version: data.version,
        files: [
          {
            filename: filename,
            content: code
          }
        ]
      })
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      if (result.run) {
        setOutput(result.run.output || '');
        setError(result.run.code !== 0);
        if (result.run.code !== 0 && result.run.stderr) {
          setOutput(result.run.stderr);
        }
      } else {
        toast.error('Failed to execute code');
        setOutput('Error: Failed to execute code');
        setError(true);
      }
    })
    .catch(err => {
      console.error('Error running code:', err);
      toast.error('Failed to run code');
      setOutput('Error: ' + err.message);
      setError(true);
    });
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-stretch justify-between h-[calc(100vh-80px)] bg-dark-950">
        
        {/* Editor Side */}
        <div className="left w-full md:w-1/2 h-1/2 md:h-full relative flex flex-col border-r border-gray-800/50">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-dark-900/50 border-b border-gray-800/50">
            <div className="flex items-center gap-3">
              <FiCode className="text-blue-400 text-xl" />
              <div>
                <h3 className="text-white font-semibold text-sm">{data?.name || 'Untitled'}</h3>
                <p className="text-gray-400 text-xs uppercase">{data?.projLanguage || 'python'}</p>
              </div>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-green-500/30 hover:shadow-green-600/40 text-sm"
              onClick={saveProject}
              title="Save (Ctrl+S)"
            >
              <FiSave className="text-base" />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 relative">
            <Editor2
              onChange={(newCode) => {
                console.log('New Code:', newCode);
                setCode(newCode || '');
              }}
              theme="vs-dark"
              height="100%"
              width="100%"
              language={data?.projLanguage || "python"}
              value={code}
              options={{
                fontSize: 14,
                fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
              }}
            />
          </div>
        </div>

        {/* Output Side */}
        <div className="right w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-br from-dark-900 to-dark-800 flex flex-col border-l border-gray-800/50">
          {/* Output Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-dark-900/50 border-b border-gray-800/50">
            <div className="flex items-center gap-3">
              <FiTerminal className="text-purple-400 text-xl" />
              <h3 className="text-white font-semibold">Output</h3>
              {output && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  error ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  <FiCheckCircle className="text-xs" />
                  <span>{error ? 'Error' : 'Success'}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 px-3 py-2 bg-dark-800 hover:bg-red-600 text-gray-300 hover:text-white transition-all rounded-lg border border-gray-700/50 hover:border-red-500/50 text-sm"
                onClick={() => {
                  setOutput('');
                  setError(false);
                }}
                title="Clear Output"
              >
                <FiRotateCcw className="text-base" />
                <span className="hidden sm:inline">Clear</span>
              </button>

              <button
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 text-sm"
                onClick={runProject}
                disabled={!data}
                title="Run Code"
              >
                <FiPlay className="text-base" />
                <span className="hidden sm:inline">Run</span>
              </button>
            </div>
          </div>

          {/* Output Content */}
          <div className="flex-1 overflow-auto p-4">
            {output ? (
              <pre className={`font-mono text-sm leading-relaxed whitespace-pre-wrap break-words ${
                error ? "text-red-400" : "text-green-400"
              }`}>
                {output}
              </pre>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FiTerminal className="text-4xl mb-4 opacity-50" />
                <p className="text-sm">Output will appear here after running your code</p>
                <p className="text-xs mt-2 text-gray-600">Click the Run button to execute your code</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
