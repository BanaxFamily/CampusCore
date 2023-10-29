import PropTypes from 'prop-types';
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [user, setUser] = useState(null)

    function login(user){
        setUser(user);
    }

    function logout(){
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.any
}
