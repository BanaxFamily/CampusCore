/* eslint-disable react/prop-types */
import { LinearProgress } from "@mui/material";
import { createContext, useState, useEffect, useContext } from "react";
import * as UserApi from '../network/user_api'
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)
    const [userRole, setUserRole] = useState(null)

    useEffect(() => {
        checkUserStatus()
        setLoading(false)
    }, [])
    console.log(userRole)

    const loginUser = async (userInfo) => {
        try {
            setLoading(true)
            const response = await UserApi.signIn(userInfo);
            const decodedToken = jwtDecode(response.token)
            localStorage.setItem('token', response.token)//Using local storage for the meantime
            setUserRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
            setUser(decodedToken)
            console.log(decodedToken)
            // console.log(response)


        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }
    const logOutUser = () => {
        setLoading(true)
        localStorage.removeItem('token')
        setUser(null)
        setUserRole(null)
        setLoading(false)
    }

    const checkUserStatus = () => {
        try {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                const decodedToken = jwtDecode(storedToken);
                setUser(decodedToken);
                setUserRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
            }
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    const contextData = {
        user,
        userRole,
        setLoading,
        loginUser,
        logOutUser,
    }


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <LinearProgress /> : children}
        </AuthContext.Provider>
    )
}

//Custom Hook
export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext;