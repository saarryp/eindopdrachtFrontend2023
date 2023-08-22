import  {useState, useContext} from 'react';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";


export const useSubscribeHook = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useContext(AuthContext);

    const subscribe = async (username, email, password) => {
        setIsLoading(true)
        setError(null)
        console.log(username, email, password)
        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup',
                {
                    username: username,
                    email: email,
                    password: password,
                    role: ["user"]

                });

            console.log(response.data)
            const result = response.data

            if (!response.ok) {
                setIsLoading(false)
                setError(response.error)
            } else {
                localStorage.setItem('user', JSON.stringify(result));
                dispatch({type: 'Login', payload: result});
            }
        } catch (error) {
            console.error(error)
            setError("Ooooops! Something went wrong during subscription.\n\n" +
                "Possible issue:\n." +
                "1.  Username and password must at least be 6 characters long.\n" +
                "2. The e-mailadress should have a valid format @.\n\n" +
                "Please check your input and try again")
        } finally {
            setIsLoading(false);
        }

        return {subscribe, isLoading, error}
    }
}