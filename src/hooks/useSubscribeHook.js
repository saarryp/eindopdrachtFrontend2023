import { useState } from 'react';
// import { AuthContext } from "../context/AuthContext";
import axios from "axios";


export const useSubscribeHook = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const[isSubscribed, setIsSubscribed] = useState(false);
    // const {  } = useContext(AuthContext);

    const regex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');

    const subscribe = async (username, email, password) => {
        setIsLoading(true);
        setError(null);
        setIsSubscribed(false);

            console.log(email)

        if (username.length < 6) {
            setError("Oooops, your name must be at least 6 characters long")
            setIsLoading(false);
            return
        }

        if (!email.match(regex)) {
            setError("Ooops your email doesnt exist. Invalid adress.");
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
            console.log(response)

            // const result = response.data;
            if (response.status !== 200) {
                setError(response.data.error);
                } else {
                localStorage.setItem('user', JSON.stringify(response.data));
                setIsSubscribed(true);
                }
                } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else if (error.message === "custom_error_condition") {
                setError("A custom error occurred. Please check your input and try again.");
            }
            if (error.response) {
                setError(error.response.data.error);
            }

        } finally {
            setIsLoading(false);
        }
    };

    // Return the variables from the hook
    return { subscribe, isLoading, error, isSubscribed };
};
