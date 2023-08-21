// import React, {createContext, useState} from "react";
// import {useHistory} from 'react-router-dom';
//
// export const AuthContext = createContext({}) {
//     const [isAuth, toggleIsAuth] = useState(false);
//     const hist
// }



//maak stuk context aan in index.js door om de app te wikkelen
//gebruik provider component van die context om de app te kunnen wikkelen


import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext({});

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'Login':
            return { user: action.payload };
        case 'Logout':
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null,
    });

    return (
        <AuthContext.Provider value={{ authState: state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider
