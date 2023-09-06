import { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


export const useSubscribeHook = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const[isSubscribed, setIsSubscribed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const navigate = useNavigate();

    const regex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');

    const closeSuccesModal = () => {setIsModalOpen(false);
    navigate('/');}

    const subscribe = async (username, email, password, roles) => {
        setIsLoading(true);
        setError(null);
        setIsSubscribed(false);

        if (username.length < 6 || password.length < 6) {
            setError("Oooops, your username and password must be at least 6 characters long")
            setIsLoading(false);
            return
        }

        if (!email.match(regex)) {
            setError("Ooops your e-mail doesnt exist. Invalid adress.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                username: username,
                email: email,
                password: password,
                roles: roles,
            });

            if (response.status !== 200) {
                setError(response.data.error);
                } else {
                localStorage.setItem('user', JSON.stringify(response.data));
                setIsSubscribed(true);
                closeSuccesModal();
                }
           // toepassen om m af te sluiten en naar homepagina login button te gaan  usenavigate
        } catch (error) {
            console.error(error)
            if (error.response) {
                if (error.response.status === 400 && error.response.data.message === "Username already exists" ) {
                    setError("Username already exists. Please choose a different username.");
                } else {
                setError(error.response.data.error);
                }

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
    return { subscribe, isLoading, error, isSubscribed, isModalOpen};
};
