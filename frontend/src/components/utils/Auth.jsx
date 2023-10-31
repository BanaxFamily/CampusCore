import PropTypes from "prop-types";
import { createContext, useState } from "react";


export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(data) {
    setUser(data);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


AuthProvider.propTypes = {
  children: PropTypes.any,
};
