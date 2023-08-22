import { useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export const useSubscribeHook = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const subscribe = async (username, email, password) => {
        setIsLoading(true);
        setError(null);

        if (username.length < 6) {
            setError("Oooops, your name must be at least 6 characters long")
            setIsLoading(false);
            return
        }

        if (!email.includes('@')) {
            setError("Ooops you forgot to add a @. Invalid adress.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                username: username,
                email: email,
                password: password,
                role: ["user"]
            });

            const result = response.data;

            if (!response.ok) {
                setError(response.error);
            } else {
                localStorage.setItem('user', JSON.stringify(result));
                dispatch({ type: 'Login', payload: result });
            }
        } catch (error) {
            setError("Ooooops! Something went wrong during subscription.\n\n" +
                "Please check your input and try again");
        } finally {
            setIsLoading(false);
        }
    };

    // Return the variables from the hook
    return { subscribe, isLoading, error };
};
