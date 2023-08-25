

import "./OurSounds.css"
import React, { useEffect, useState } from 'react';


export default function OurSounds() {
 const [ourFavorites, setOurFavorites] =useState([]);

    useEffect(() => {
        const storedOurFavorites = JSON.parse(localStorage.getItem('ourFavorites') || '[]');
        setOurFavorites(storedOurFavorites);
    }, []);

    const handleRemoveOurFavorite = (track) => {
    const updatedOurFavorites = ourFavorites.filter((ourFavorite) => ourFavorite.name !== track.name || ourFavorite.artist !== track.artist);
    setOurFavorites(updatedOurFavorites);
    localStorage.setItem('ourFavorites', JSON.stringify(updatedOurFavorites));
};


return (
    <div className="background-container">
        <ol>
            {ourFavorites.length > 0 ? (
                ourFavorites.map((favorite, index) => {
                    if (!favorite || !favorite.name || !favorite.artist) {
                        console.log("Invalid favorite data:", favorite);
                        return null;
                    }
                    console.log("OurFavorite:", favorite.name, favorite.artist);
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
                            <div className="border-for-delete">
                                <button className="delete-button" onClick={() => handleRemoveOurFavorite(favorite)}>
                                    delete song
                                </button>
                            </div>
                        </li>
                    );
                })
            ) : (
                <p className="list-items">No favorites found.</p>
            )}
        </ol>
        <div className="position-button">
            <button className="button-logout">uitloggen</button>
        </div>
    </div>
);
}


