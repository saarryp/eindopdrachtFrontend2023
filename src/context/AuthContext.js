
//maak stuk context aan in index.js door om de app te wikkelen
//gebruik provider component van die context om de app te kunnen wikkelen


import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const [isAuth, setIsAuth] = useState({
        isAuthenticated: false,
        user: null,
        status: "pending",
    });

    console.log("AuthContextProvider rendering ...")


    //is er een token en deze geldig
    //ja? haal de gebruikers gegevens op
    //zo nee doe niks, laat de state leeg
    useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
          const decodedToken = jwtDecode(token);
            void fetchUserData(decodedToken.id, token)
      } else {
          setIsAuth(
              {
                  ...isAuth,
                  status: 'done',
              })
          }
    }, []);


    const navigate = useNavigate();

    // useEffect(() => {
    //  console.log('test')
    //     setIsAuth(prevState => ({
    //         ...prevState,
    //        isAuthenticated: false,
    //         user: null,
    //         status: "done",
    //     }));
    // }, []);

    console.log("isAuth", isAuth);

    async function fetchUserData(id, decodedToken, token) {
        try {
            const response =await axios.get(` https://frontend-educational-backend.herokuapp.com/api/user/${decodedToken}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

            console.log(response.data);

            setIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: 'done',
            })
        } catch(e) {
            setIsAuth({
                ...isAuth,
                status: 'done',
            })
            console.error(e)
        }
    }


    //handle de loginactions hieronder, log niet in maar handelt alle actie af
    function login(token) {
        // console.log(token)
        //als de loginfunctie de token heeft opgehaald dan function login(token)
        // dan console.log(token), dan in de context de token is gelogd
        //dan localStorage aanroepen want anders bij refreshen ben je alles kwijt
        // localStorage.setItem();
        localStorage.setItem('token', token)
        const decodedToken = jwtDecode(token)
        console.log("User is logged in");
        void fetchUserData(decodedToken, token);

        // setIsAuth({
        //     isAuthenticated: true,
        //     user: {
        //         id: 1,
        //         username: 'user',
        //         email: 'email',
        //     },
        //     status: "done"
        //     //dan console.log(response.data.accesToken);
        //     //dan loginFunction(response.data.accesToken) als parameter doorgeven dan krijg je m bij useLoginHook binnen bij token
        // });
        navigate('/search')
    }

    function logout() {
        localStorage.clear();
        //token uit local storage verwijderen
        // console.log("user is logged out");
        //de gebruikersgegegevns uit de state verwijderen
        //auth op false zetten
        setIsAuth({
            isAuthenticated: false,
            user: null,
            status: 'done',
        });
        console.log("user is logged out")
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


