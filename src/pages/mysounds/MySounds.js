import "./MySounds.css"
import React, {useEffect, useState} from 'react';

export default function MySounds() {
    const [myFavorites, setMyFavorites] = useState('');

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setMyFavorites(storedFavorites);
    }, []);

    const handleRemoveFavorite = (song) => {
        const updatedFavorites = myFavorites.filter((item) => item !== song);
        setMyFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

        return (
        <>
            <div className="background-container">
                <ol>
                    {myFavorites.length > 0 ? (
                        myFavorites.map((favorite, index) => (
                            <li key={index} className="list-items">
                                {favorite.name} <button onClick={() => handleRemoveFavorite(favorite)}>delete</button>
                            </li>
                        ))
                    ) : (
                        <p className="list-items">No favorites found.</p>
                    )}
                </ol>
                <div className="position-button">
                    <button className="button-logout">uitloggen</button>
                </div>
            </div>
        </>
        );
        }
