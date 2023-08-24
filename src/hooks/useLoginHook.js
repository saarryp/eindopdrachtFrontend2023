import {useContext} from 'react';
import axios from "axios";
import AuthContext from "../context/AuthContext";





//bij inloggen heoft geen token mee te
// sturen pas na inloggen dat we een token krijgen
//dan pas token meesturen

function Login() {

    const { loginFunction } = useContext(AuthContext);


    async function logUserIn() {
        try {
            const response = await axios.post(
                'https://frontend-educational-backend.herokuapp.com/api/auth/signin',

            {
                    email: "piet@novi.nl",
                    password: "123456"
            }
            );
            console.log(response)
            // als de token is opgehaald in de console dan console.log(response.data.accesToken);
            //dan logInfunction(response.data.accesToken); om de data naar de context door te sturen
            //dan in de context van AuthContext de functie een argument mee te geven
            //roep de functie van de context aan zodat de rest geregeld kan worden
            loginFunction()
        } catch(e) {
            console.error(e)
        }
    }


    return (
        {logUserIn}
    )
}

export default Login;