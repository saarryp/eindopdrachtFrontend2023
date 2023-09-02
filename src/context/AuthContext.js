
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {checkTokenValidity} from "../helper/checkTokenValidity";

export const AuthContext = createContext({});



function AuthContextProvider({ children }) {
    const [isAuth, setIsAuth] = useState({
        isAuthenticated: false,
        user: null,
        status: 'pending',
    });

    console.log('AuthContextProvider rendering ...');


    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken && checkTokenValidity(storedToken)) {
            const decodedToken = jwtDecode(storedToken);
            console.log('Token found');
           void fetchUserData(decodedToken, storedToken);
        } else {
            setIsAuth((prevState) => ({
                ...prevState,
                status: 'done',
            }));
            console.log('No token found');
        }
    }, []);

    const navigate = useNavigate();

    console.log('isAuth', isAuth);

    async function fetchUserData(decodedToken, token) {
        console.log(decodedToken)
        try {
            const response = await axios.get(
                `https://frontend-educational-backend.herokuapp.com/api/user`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Fetched user data:', response.data);

            setIsAuth((prevState) => ({
                ...prevState,
                isAuthenticated: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                    roles: response.data.roles,
                },
                status: 'done',
            }));
        } catch (e) {
            setIsAuth((prevState) => ({
                ...prevState,
                status: 'done',
            }));
            console.error('Error fetching user data:', e);
        }
    }

    function login(userData) {
        localStorage.setItem('token', userData.accessToken);
        console.log('User is logged in', userData.accessToken);
        setIsAuth((prevState) => ({
            ...prevState,
            isAuthenticated: true,
            user: {
                username: userData.username,
                email: userData.email,
                id: userData.id,
                roles: userData.roles,
            },
            status: 'done',
        }));
        navigate('/my-sounds');
    }

    function logout() {
        localStorage.removeItem('token');

        setIsAuth((prevState) => ({
            ...prevState,
            isAuthenticated: false,
            user: null,
            status: 'done',
        }));

        console.log('User is logged out');
        navigate('/');
    }



    const contextData = {
        isAuthenticated: isAuth.isAuthenticated,
        user: isAuth.user,
        userRole: isAuth.user ? isAuth.user.roles[0] : null,
        loginFunction: login,
        logoutFunction: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
