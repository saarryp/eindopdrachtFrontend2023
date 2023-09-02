import {useContext} from 'react';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function useLoginHook(user, password) {

     const {loginFunction} = useContext(AuthContext);


    async function logUserIn(username, password) {
        try {
            const response = await axios.post(
                'https://frontend-educational-backend.herokuapp.com/api/auth/signin',

            {
                    username: username,

                    password: password,

            }
            );

            console.log('Token', response.data.accessToken );

            loginFunction(response.data.accessToken)
        } catch(e) {
            console.error(e)
        }
    }

    console.log("logUserIn function:", )

    return (
        {logUserIn}
    )
}

export default useLoginHook;