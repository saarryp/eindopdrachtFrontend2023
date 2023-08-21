import  {useState, useContext} from 'react';
import {AuthContext} from "../context/AuthContext";


export const useSubscribeHook = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useContext(AuthContext);

    const subscribe = async (username, email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, email, password})
            });

            const json = await response.json()

            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            } else {
                localStorage.setItem('user', JSON.stringify(json));
                dispatch({type: 'Login', payload: json});
            }
        } catch (error) {
            setError("Ooooops! Something went wrong during subscription.\n\n" +
                "Possible issue:\n." +
                "1.  Username and password must at least be 6 characters long.\n" +
                "2. The e-mailadress should have a valid format @.\n\n" +
                "Please check your input and try again")
        }
             finally {
            setIsLoading(false);
        }
    // if (response.ok) {
    //     //save user to localstorage
    //     localStorage.setItem('user', JSON.stringify(json))
    //
    //     //update the auth context
    //
    //     dispatch({type: 'Login', payload: JSON})
    //
    //     setIsLoading(false)
    }
    return { subscribe, isLoading, error}
    }


