import { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';

// Monaco Editor Language Imports
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution';
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution';
import 'monaco-editor/esm/vs/basic-languages/csharp/csharp.contribution';
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution';
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution';
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution';

const API_KEY = String(import.meta.env.VITE_CODEBOX_API_KEY); // TO DO - Secure it

// Define the languages 
const languages = {
  javascript: { name: 'JavaScript', id: 63, extension: 'js', boilerplate: `function hello() {\n\tconsole.log('Hello, world!');\n}` },
  python: { name: 'Python', id: 71, extension: 'py', boilerplate: `def hello():\n\tprint('Hello, world!')\n\nhello()` },
  java: { name: 'Java', id: 62, extension: 'java', boilerplate: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, world!");\n\t}\n}` },
  csharp: { name: 'C#', id: 51, extension: 'cs', boilerplate: `using System;\n\nclass Program {\n\tstatic void Main() {\n\t\tConsole.WriteLine("Hello, world!");\n\t}\n}` },
  cpp: { name: 'C++', id: 54, extension: 'cpp', boilerplate: `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, world!" << std::endl;\n\treturn 0;\n}` },
  // html: { name: 'HTML', id: 55, extensions: 'html', boilerplate: `<!DOCTYPE html>\n<html>\n<head>\n\t<title>Hello, World!</title>\n</head>\n<body>\n\t<h1>Hello, world!</h1>\n</body>\n</html>` },
  // css: { name: 'CSS', id: 56, extensions: 'css', boilerplate: `body {\n\tfont-family: Arial, sans-serif;\n}\nh1 {\n\tcolor: #333;\n}` }
};

const defaultLanguage = 'javascript';

// Monaco Editor options
const editorOptions = {
  // Basic Editor Configurations
  readOnly: false,

  // Layout and Size
  lineNumbers: 'on',      // Options: 'on', 'off', 'relative'

  // Font and Appearance
  fontSize: 14,
  fontFamily: 'Courier New',
  lineHeight: 20,          // Default line height in pixels
  wordWrap: 'on',         // Options: 'on', 'off', 'wordWrapColumn', 'bounded'
  wordWrapColumn: 80,      // Effective only if wordWrap is 'wordWrapColumn'
  minimap: {
    enabled: true,
    renderCharacters: true,
    maxColumn: 120         // Maximum width of the minimap
  },
  overviewRulerLanes: 3,
  hideCursorInOverviewRuler: false,

  // Cursor
  cursorStyle: 'line',    // Options: 'block', 'line', 'underline'
  cursorBlinking: 'smooth', // Options: 'blink', 'smooth', 'phase', 'expand', 'solid'
  scrollBeyondLastLine: true,
  tabSize: 4,             // Number of spaces per tab
  insertSpaces: true,     // If true, spaces are used for indentation
  detectIndentation: true, // If true, automatic detection of indentation based on file content
  autoClosingBrackets: true,
  autoClosingQuotes: true,
  formatOnType: true,
  formatOnPaste: true,

  // Code Folding
  folding: true,
  foldingStrategy: 'auto', // Options: 'auto', 'indentation'

  // Code Suggestions and IntelliSense
  suggestOnTriggerCharacters: true,
  quickSuggestions: {
    other: true,
    comments: true,
    strings: true
  },
  parameterHints: true,
  autoIndent: 'full', // Options: 'none', 'keep', 'brackets', 'full'

  // Accessibility
  ariaLabel: 'Monaco Editor',
  accessibilitySupport: 'auto', // Options: 'auto', 'on', 'off'

  // Other
  contextmenu: true,
  multiCursorModifier: 'alt', // Options: 'alt', 'ctrl', 'meta'
  renderWhitespace: 'boundary', // Options: 'none', 'boundary', 'all'
  renderControlCharacters: true,
};

const styles = {
  container: { display: 'flex', height: '100vh', overflow: 'hidden' },
  leftPane: { width: '50%', display: 'flex', flexDirection: 'column' },
  rightPane: { width: '50%', padding: '10px', backgroundColor: '#f5f5f5', overflow: 'auto' },
  menu: { display: 'flex', justifyContent: 'space-around', padding: '10px', borderBottom: '1px solid #ddd' },
  select: { marginRight: '10px' },
  button: { marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' },
  editor: { flex: 1 },
  output: { whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: '14px', color: '#333' },
  loadingText: { color: '#888', fontStyle: 'italic' },
};

function CodeBox() {
  const [code, setCode] = useState(`function hello() {\n\tconsole.log('Hello, world!');\n}`);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState(defaultLanguage);
  const [loading, setLoading] = useState(false);

  // Function to execute JavaScript code locally
  const executeLocally = (code) => {
    setLoading(true);
    let capturedOutput = '';

    // Override console.log to capture its output
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      capturedOutput += args.join(' ') + '\n';
    };

    try {
      eval(code);  // Execute the code
      setOutput(capturedOutput || 'No output');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      // Restore the original console.log after execution
      console.log = originalConsoleLog;
      setLoading(false);
    }
  };

  // Function to send code to Judge0 for remote execution
  const executeWithJudge0 = async (code, languageId) => {
    setLoading(true);
    setOutput('Executing your code...');

    try {
      const response = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions',
        {
          source_code: code,
          language_id: languageId,
          stdin: '',  // You can pass input here if needed
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'x-rapidapi-key': API_KEY,  // Replace with your actual API key
          }
        }
      );

      const token = response.data.token;

      // Poll the API to get the result after execution
      const getResult = async () => {
        const result = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
          {
            headers: {
              'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
              'x-rapidapi-key': API_KEY,  // Replace with your actual API key
            }
          }
        );

        if (result.data.status.id <= 2) {
          // Status id 1 (In Queue) and 2 (Processing), wait for the result
          setTimeout(getResult, 1000);
        } else {
          setOutput(result.data.stdout || result.data.stderr || 'No output');
          setLoading(false);
        }
      };

      getResult();
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setLoading(false);
    }
  };

  const handleRun = () => {
    setLoading(true);
    if (language === 'javascript') {
      executeLocally(code);  // Execute locally if the language is JavaScript
    } else {
      const languageId = languages[language].id;
      executeWithJudge0(code, languageId);  // Send code to Judge0 for other languages
    }
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const fileName = `code.${languages[language].extension}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Update code when the selected language changes
  useEffect(() => {
    setCode(languages[language].boilerplate);
  }, [language]);

  return (
    <div style={styles.container}>
      <div style={styles.leftPane}>
        <div style={styles.menu}>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={styles.select}
          >
            {Object.keys(languages).map((key) => (
              <option key={key} value={key}>
                {languages[key].name}
              </option>
            ))}
          </select>
          <button onClick={handleRun} style={styles.button} disabled={loading}>
            {loading ? 'Running...' : 'Run'}
          </button>
          <button onClick={handleSave} style={styles.button}>Save</button>
        </div>
        <MonacoEditor
          height="calc(100vh - 60px)"
          language={language}
          value={code}
          onChange={(newValue) => setCode(newValue)}
          options={editorOptions}
          editorDidMount={(editor) => editor.focus()}
          theme='vs-dark'
          style={styles.editor}
        />
      </div>
      <div style={styles.rightPane}>
        <div style={styles.menu}>
          <p>Output</p>
        </div>
        {loading ? (
          <p style={styles.loadingText}>Processing the code, please wait...</p>
        ) : (
          <pre style={styles.output}>{output}</pre>
        )}
      </div>
    </div>
  );
}

export default CodeBox;