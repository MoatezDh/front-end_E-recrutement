import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';

export default function CodeEditor() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript'); // Default language is JavaScript

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        {/* Add other language options as needed */}
      </select>
      <MonacoEditor
        language={language}
        value={code}
        onChange={handleCodeChange}
        options={{
          minimap: {
            enabled: false
          }
        }}
      />
    </div>
  );
}