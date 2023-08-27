import "./MySounds.css"
import React, {useEffect, useState} from 'react';



    export default function MySounds() {
        const [myFavorites, setMyFavorites] = useState([]);
        //asynchrone functie om alle paginaspecifieke gegevens op te halen
        //moet k hier nog een getrequest maken naar backend en token meesturen?
        //door op te vragen met localstorage.getItem()
        //de data die je terugkrijgt zet je weer in de state
        //en vanuit de state kun je het weer weergeven op de pagina

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
                            console.log("Invalid favorite data:", favorite);
                            return null;
                        }
                        console.log("Favorite:", favorite.name, favorite.artist);
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
                                    <button className="delete-button" onClick={() => handleRemoveMyFavorite(favorite)}>
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

