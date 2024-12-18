import React, { createContext, useState, useContext, useEffect } from 'react';
import users from '../data/user.json';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for stored auth data when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    // Remove user data from localStorage
    localStorage.removeItem('user');
  };

  const isAuthorized = () => {
    return user && (user.role === 'superuser' || user.role === 'moderator');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
