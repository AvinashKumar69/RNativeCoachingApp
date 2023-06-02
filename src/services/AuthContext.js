import React, {createContext, useState} from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <AuthenticationContext.Provider
      value={{
        userAuthenticated,
        setUserAuthenticated,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
