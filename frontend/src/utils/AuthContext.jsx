/* eslint-disable react/prop-types */
import { LinearProgress } from "@mui/material";
import { createContext, useState, useEffect, useContext } from "react";
import * as UserApi from '../network/user_api'
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(false)
    const [userId, setUserId] = useState(null)
    const [userRole, setUserRole] = useState(null)
    const [error, setError] = useState(null)
    const [courseName, setCourseName] = useState(null)
    const [facultyGroupAdviserId, setFacultyGroupAdviserId] = useState(null)

    useEffect(() => {
        checkUserStatus()
        setLoading(false)
    }, [])

    const loginUser = async (userInfo) => {
        try {
            setLoading(true)
            const response = await UserApi.signIn(userInfo);
            if (response.isSuccess) {
                // setSuccess("User updated successfully!");
                const decodedToken = jwtDecode(response.token)
                localStorage.setItem('token', response.token)//Using local storage for the meantime
                setUserRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
                setUser(decodedToken)
                setUserId(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
                return;
            }

            if (!response.ok) {
                const data = await response.json();
                // Check if there are multiple errors
                // Extract values from errors
                const errorValues = Object.values(data.errors)
                    .reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
                // Set the error state with values
                setError(errorValues.join(', '));
                // console.error('Error : ', [...data.errors]);
                // setError(data.errors[0]);
                return;
            }

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
        setUserId(null)
        setUserRole(null)
        setLoading(false)
        setFacultyGroupAdviserId(null)
    }

    const checkUserStatus = () => {
        try {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                const decodedToken = jwtDecode(storedToken);
                setUser(decodedToken);
                setUserRole(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
                setUserId(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
            }

        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    const contextData = {
        error,
        user,
        userId,
        userRole,
        courseName,
        facultyGroupAdviserId,
        setError,
        loginUser,
        setLoading,
        logOutUser,
        setCourseName,
        setFacultyGroupAdviserId
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