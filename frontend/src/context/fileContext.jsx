import React, { createContext, useState } from 'react';

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [fileContext, setFileContext] = useState(null);
  return (
    <FileContext.Provider value={{ fileContext, setFileContext }}>
      {children}
    </FileContext.Provider>
  );
};