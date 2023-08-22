
//maak stuk context aan in index.js door om de app te wikkelen
//gebruik provider component van die context om de app te kunnen wikkelen


import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState({
        isAuthenticated: false,
        user: null,
        status: "pending",
    });
    const navigate = useNavigate();
    useEffect(() => {
        console.log('test')
        setIsAuth({
            isAuthenticated: false,
            user: null,
            status: "done",
        });
    }, []);

    function login() {
        console.log("User is logged in");
        setIsAuth({
            isAuthenticated: true,
            user: {
                username: 'piet',
                email: 'piet@novi.nl',
            }
        });
        navigate('/my-sounds')
    }

    function logout() {
        //token uit local storage verwijderen
        console.log("user is logged out");
        //de gebruikersgegegevns uit de state verwijderen
        //auth op false zetten
        setIsAuth({
            isAuthenticated: false,
            user: null,
        });
        navigate('/');
    }

    const contextData = {
        isAuthenticated: isAuth.isAuthenticated,
        user: isAuth.user,
        loginFunction: login,
        logoutFunction: logout,
    };


    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider


