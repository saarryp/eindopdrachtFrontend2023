import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {checkTokenValidity} from "../helper/checkTokenValidity";

export const AuthContext = createContext({});


function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState({
        isAuthenticated: false,
        user: null,
        status: 'pending',
    });


    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken && checkTokenValidity(storedToken)) {
            const decodedToken = jwtDecode(storedToken);
            void fetchUserData(decodedToken, storedToken);
        } else {
            setIsAuth((prevState) => ({
                ...prevState,
                status: 'done',
            }));
        }
    }, []);

    const navigate = useNavigate();

    async function fetchUserData(decodedToken, token) {
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
