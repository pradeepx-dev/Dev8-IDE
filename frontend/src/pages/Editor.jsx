import React, { useEffect, useState, useCallback, useRef } from 'react';
import Navbar from '../components/Navbar';
import Editor2 from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';
import { FiSave, FiPlay, FiRotateCcw, FiTerminal, FiCode, FiCheckCircle, FiLoader } from 'react-icons/fi';

const Editor = () => {
  const [code, setCode] = useState(""); // State to hold the code
  const { id } = useParams(); // Extract project ID from URL params
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef(null);
  const [data, setData] = useState(null);

  // Save project ref for editor commands
  const saveProjectRef = useRef(null);
  
  // Handle editor mount
  const handleEditorDidMount = useCallback((editor, monaco) => {
    editorRef.current = editor;
    
    // Fix cursor and input issues
    editor.focus();
    
    // Enable better cursor behavior
    editor.updateOptions({
      cursorStyle: 'line',
      cursorWidth: 2,
      cursorBlinking: 'smooth',
      smoothScrolling: true,
      mouseWheelZoom: true,
      multiCursorModifier: 'ctrlCmd',
      quickSuggestions: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: 'on',
      tabCompletion: 'on',
      wordBasedSuggestions: 'matchingDocuments',
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      if (saveProjectRef.current) {
        saveProjectRef.current();
      }
    });

    // Fix input handling
    editor.onDidChangeModelContent(() => {
      // Ensure cursor is visible
      const position = editor.getPosition();
      if (position) {
        editor.revealLineInCenter(position.lineNumber);
      }
    });
  }, []);

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
    if (isSaving) return;
    
    setIsSaving(true);
    const trimmedCode = code?.toString().trim() || ''; // Ensure code is a string and trimmed

    fetch(`${api_base_url}/saveProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
        code: trimmedCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.msg || 'Project saved successfully');
        } else {
          toast.error(data.msg || 'Failed to save project');
        }
      })
      .catch((err) => {
        console.error('Error saving project:', err);
        toast.error('Failed to save the project.');
      })
      .finally(() => {
        setIsSaving(false);
      });
  }, [code, id, isSaving]);

  // Update saveProject ref
  useEffect(() => {
    saveProjectRef.current = saveProject;
  }, [saveProject]);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+S or Cmd+S for save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [saveProject]); // Include dependencies

  // Parse imports and dependencies from code
  const parseImports = (code, language) => {
    const imports = [];
    const lines = code.split('\n');
    
    if (language === 'python') {
      lines.forEach(line => {
        const importMatch = line.match(/^(import|from)\s+(\S+)/);
        if (importMatch) {
          imports.push(importMatch[2].split('.')[0]);
        }
      });
    } else if (language === 'javascript') {
      lines.forEach(line => {
        const importMatch = line.match(/^(import|require)\s+['"]([^'"]+)['"]/);
        if (importMatch) {
          imports.push(importMatch[2]);
        }
      });
    } else if (language === 'c' || language === 'cpp') {
      lines.forEach(line => {
        const includeMatch = line.match(/^#include\s+[<"]([^>"]+)[>"]/);
        if (includeMatch) {
          imports.push(includeMatch[1]);
        }
      });
    } else if (language === 'java') {
      lines.forEach(line => {
        const importMatch = line.match(/^import\s+([\w.]+)/);
        if (importMatch) {
          imports.push(importMatch[1]);
        }
      });
    }
    
    return imports;
  };

  // Generate header files for C/C++
  const generateHeaderFiles = (code, language) => {
    if (language !== 'c' && language !== 'cpp') return [];
    
    const headerFiles = [];
    const lines = code.split('\n');
    
    lines.forEach(line => {
      const includeMatch = line.match(/^#include\s+[<"]([^>"]+)[>"]/);
      if (includeMatch) {
        const headerName = includeMatch[1];
        // Standard library headers are usually available
        if (!headerName.startsWith('std') && !headerName.includes('stdio') && 
            !headerName.includes('stdlib') && !headerName.includes('string')) {
          // For custom headers, we'd need to create them, but for now we'll handle standard ones
          headerFiles.push({
            name: headerName,
            content: `// Header file: ${headerName}\n// Standard library header`
          });
        }
      }
    });
    
    return headerFiles;
  };

  const runProject = () => {
    if (!data) {
      toast.error('Project data not loaded');
      return;
    }

    if (isRunning) {
      toast.info('Code is already running...');
      return;
    }

    setIsRunning(true);
    setOutput('');
    setError(false);

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
    const language = data.projLanguage;
    
    // Prepare files array
    const files = [{
      filename: filename,
      content: code
    }];

    // Add header files for C/C++
    if (language === 'c' || language === 'cpp') {
      const headers = generateHeaderFiles(code, language);
      headers.forEach(header => {
        files.push({
          filename: header.name,
          content: header.content
        });
      });
    }

    // Prepare execution payload
    const payload = {
      language: language,
      version: data.version || '*',
      files: files,
      stdin: '',
      args: []
    };

    // For Python, add common imports handling
    if (language === 'python') {
      const imports = parseImports(code, language);
      if (imports.length > 0) {
        // Piston API should handle standard library imports
        // For third-party packages, we might need special handling
        console.log('Detected imports:', imports);
      }
    }

    // For JavaScript, handle require/import
    if (language === 'javascript') {
      // Piston API handles Node.js modules
      payload.language = 'javascript';
    }

    // For C/C++, ensure proper compilation flags
    if (language === 'c' || language === 'cpp') {
      payload.compile_timeout = 10000; // 10 seconds for compilation
      payload.run_timeout = 5000; // 5 seconds for execution
    }

    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(result => {
      console.log('Execution result:', result);
      
      if (result.compile) {
        if (result.compile.stdout) {
          setOutput(result.compile.stdout);
        }
        if (result.compile.stderr) {
          setOutput(result.compile.stderr);
          setError(true);
          return;
        }
      }
      
      if (result.run) {
        let outputText = '';
        
        if (result.run.stdout) {
          outputText += result.run.stdout;
        }
        
        if (result.run.stderr) {
          outputText += (outputText ? '\n' : '') + result.run.stderr;
        }
        
        setOutput(outputText || 'No output');
        setError(result.run.code !== 0);
        
        if (result.run.code !== 0) {
          toast.error(`Execution failed with exit code ${result.run.code}`);
        } else {
          toast.success('Code executed successfully');
        }
      } else {
        toast.error('Failed to execute code - no run result');
        setOutput('Error: No execution result received');
        setError(true);
      }
    })
    .catch(err => {
      console.error('Error running code:', err);
      toast.error('Failed to run code: ' + err.message);
      setOutput('Error: ' + err.message + '\n\nMake sure your code is correct and all required imports/headers are available.');
      setError(true);
    })
    .finally(() => {
      setIsRunning(false);
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
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-lg shadow-green-500/30 hover:shadow-green-600/40 text-sm"
              onClick={saveProject}
              disabled={isSaving}
              title="Save (Ctrl+S)"
            >
              {isSaving ? (
                <FiLoader className="text-base animate-spin" />
              ) : (
                <FiSave className="text-base" />
              )}
              <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 relative" onMouseDown={(e) => {
            // Ensure editor gets focus on click
            if (editorRef.current) {
              setTimeout(() => editorRef.current.focus(), 0);
            }
          }}>
            <Editor2
              onMount={handleEditorDidMount}
              onChange={(newCode) => {
                setCode(newCode || '');
              }}
              theme="vs-dark"
              height="100%"
              width="100%"
              language={data?.projLanguage || "python"}
              value={code}
              loading={
                <div className="flex items-center justify-center h-full">
                  <FiLoader className="animate-spin text-blue-400 text-2xl" />
                </div>
              }
              options={{
                fontSize: 14,
                fontFamily: 'JetBrains Mono, Monaco, Consolas, monospace',
                minimap: { enabled: true },
                scrollBeyondLastLine: true,
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                wordWrap: 'on',
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
                cursorStyle: 'line',
                cursorWidth: 2,
                // Fix input and cursor issues
                readOnly: false,
                domReadOnly: false,
                contextmenu: true,
                mouseWheelZoom: true,
                smoothScrolling: true,
                // Better autocomplete
                quickSuggestions: {
                  other: true,
                  comments: true,
                  strings: true
                },
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnEnter: 'on',
                tabCompletion: 'on',
                wordBasedSuggestions: 'matchingDocuments',
                // Code features
                formatOnPaste: true,
                formatOnType: true,
                autoIndent: 'full',
                bracketPairColorization: {
                  enabled: true
                },
                // Selection
                selectOnLineNumbers: true,
                roundedSelection: false,
                // Editor behavior
                multiCursorModifier: 'ctrlCmd',
                accessibilitySupport: 'auto',
                // Performance
                renderWhitespace: 'selection',
                renderControlCharacters: false,
                renderIndentGuides: true,
                folding: true,
                foldingStrategy: 'auto',
                showFoldingControls: 'always',
                unfoldOnClickAfterEndOfLine: true,
                // Scrollbar
                scrollbar: {
                  vertical: 'auto',
                  horizontal: 'auto',
                  useShadows: true,
                  verticalHasArrows: false,
                  horizontalHasArrows: false,
                  verticalScrollbarSize: 10,
                  horizontalScrollbarSize: 10
                }
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
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-all rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 text-sm"
                onClick={runProject}
                disabled={!data || isRunning}
                title="Run Code (Ctrl+Enter)"
              >
                {isRunning ? (
                  <FiLoader className="text-base animate-spin" />
                ) : (
                  <FiPlay className="text-base" />
                )}
                <span className="hidden sm:inline">{isRunning ? 'Running...' : 'Run'}</span>
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
