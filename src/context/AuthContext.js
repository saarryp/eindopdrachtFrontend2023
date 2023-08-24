
//maak stuk context aan in index.js door om de app te wikkelen
//gebruik provider component van die context om de app te kunnen wikkelen


import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext({})

// f

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState({
        isAuthenticated: false,
        user: null,
        status: "done",
    });

    console.log("AuthContextProvider rendering ...")

    const navigate = useNavigate();
    useEffect(() => {
        console.log('test')
        setIsAuth(prevState => ({
            ...prevState,
            isAuthenticated: false,
            user: null,
            status: "done",
        }));
    }, []);

    console.log("isAuth", isAuth);

    function login(token) {
        // console.log(token)
        //als de loginfunctie de token heeft opgehaald dan function login(token)
        // dan console.log(token), dan in de context de token is gelogd
        //dan localStorage aanroepen want anders bij refreshen ben je alles kwijt
        // localStorage.setItem();
        console.log("User is logged in");
        setIsAuth({
            isAuthenticated: true,
            user: {
                username: 'user',
                email: 'email',
            }
            //dan console.log(response.data.accesToken);
            //dan loginFunction(response.data.accesToken) als parameter doorgeven dan krijg je m bij useLoginHook binnen bij token
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
}

export default AuthContextProvider


