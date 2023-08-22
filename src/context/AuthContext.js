
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
        console.log("user is logged out");
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

// export const AuthReducer = (state, action) => {
//     switch (action.type) {
//         case 'Login':
//             return { user: action.payload };
//         case 'Logout':
//             return { user: null };
//         default:
//             return state;
//     }
// };
//
// export const AuthContextProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(AuthReducer, {
//         user: null,
//     });

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
};

export default AuthContextProvider


