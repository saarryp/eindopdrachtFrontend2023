import "./OurSounds.css"
import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import LogoutButton from "../../components/logoutButton/LogoutButton";


export default function OurSounds() {

    const {user} = useContext(AuthContext);
    const [ourFavorites, setOurFavorites] = useState([]);

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
        <main className="background-container">
            <ol>
                {ourFavorites.length > 0 ? (
                    ourFavorites.map((favorite, index) => {
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
                                    <p className="track-name">{favorite.name}</p>
                                    <p>{favorite.artist.name}</p>
                                </a>
                                {" "}
                                <div className="border-for-delete">
                                    {(user.roles[0] === 'ROLE_ADMIN') &&
                                        <button className="delete-button"
                                                onClick={() => handleRemoveOurFavorite(favorite)}>
                                            delete song
                                        </button>}
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <p className="list-items">No favorites found.</p>
                )}
            </ol>
            <section className="position-button-our-sounds">
                <div className="button-logout-our-sounds">
                    <LogoutButton/>
                </div>
            </section>

        <footer className="footer-oursounds">
            copyright Sassy S
        </footer>
        </main>


);
}


