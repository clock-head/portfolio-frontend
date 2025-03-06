import { useState, createContext, useContext, useEffect } from 'react';

export const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [apiUrl, setApiUrl] = useState(null);

  useEffect(() => {
    const storedApiUrl = sessionStorage.getItem('apiUrl');
    if (storedApiUrl) {
      setApiUrl(storedApiUrl);
    } else {
      console.log('apiCtx');
      fetch('/data/config.json')
        .then((res) => res.json())
        .then((data) => {
          sessionStorage.setItem('apiUrl', data.apiUrl);
          setApiUrl(data.apiUrl);
        })
        .catch(console.error);
    }
  }, []);

  const apiCtx = {
    url: apiUrl,
  };

  return (
    <ApiContext.Provider value={apiCtx}>
      {apiUrl ? children : <div>...Loading...</div>}
    </ApiContext.Provider>
  );
}
