import "./MySounds.css"
import React, {useEffect, useState, useContext} from 'react';
import LogoutButton from "../../components/logoutButton/LogoutButton";
import {AuthContext} from "../../context/AuthContext";

export default function MySounds() {
        const [myFavorites, setMyFavorites] = useState([]);
        const { user } = useContext(AuthContext);


        useEffect(() => {
            const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            setMyFavorites(storedFavorites);
        }, []);

        const handleRemoveMyFavorite = (track) => {
            const updatedFavorites = myFavorites.filter((favorite) => favorite.name !== track.name || favorite.artist !== track.artist);
            setMyFavorites(updatedFavorites);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        };


        return (
        <div className="background-container">
            <ol>
                {myFavorites.length > 0 ? (
                    myFavorites.map((favorite, index) => {
                        if (!favorite || !favorite.name || !favorite.artist) {
                            return null;
                        }
                        return (
                            <li key={index} className="list-items">
                                <span className="list-item-number">
                                {index + 1}.</span>
                                <a
                                    href={`https://www.last.fm/search?q=${encodeURIComponent(favorite.name)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <p className="track-name">{favorite.name }</p>
                                    <p>{favorite.artist.name}</p>
                                </a>
                                {" "}
                                {(user.roles[0] === 'ROLE_USER') &&
                                <div className="border-for-delete">
                                    <button className="delete-button" onClick={() => handleRemoveMyFavorite(favorite)}>
                                        delete song
                                    </button>
                                </div>}

                            </li>
                        );
                    })
                ) : (
                    <p className="list-items">No favorites found.</p>
                )}
            </ol>
            <div className="position-button">
                <div className="button-logout">
                <LogoutButton/>
                </div>
             </div>
        </div>

    );
}

