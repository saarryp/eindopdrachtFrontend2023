
import './OurSounds.css'
import React, {useEffect, useState} from "react";


export default function OurSound() {
    const [ourFavorites, setOurFavorites] = useState([]);

    useEffect(() => {
        // Get the favorites from localStorage (if any) or initialize with an empty array
        const storedFavorites = JSON.parse(localStorage.getItem('ourFavorites') || '[]');
        setOurFavorites(storedFavorites);
    }, []);

    // Function to add a track to the "OurSound" page
    const addTrackToOurSound = (track) => {
        const isTrackInList = ourFavorites.some((favorite) => favorite.name === track.name && favorite.artist === track.artist);

        // Check if the number of favorites exceeds 10
        if (ourFavorites.length >= 10) {
            alert('You have already added 10 favorite songs. Remove songs from the list.');
            return;
        }

        if (!isTrackInList) {
            const updatedFavorites = [...ourFavorites, track];
            setOurFavorites(updatedFavorites);
            // Update the liked songs in localStorage
            localStorage.setItem('ourFavorites', JSON.stringify(updatedFavorites));
        }
    };

    // Function to remove a track from the "OurSound" page
    const removeTrackFromOurSound = (track) => {
        const updatedFavorites = ourFavorites.filter((favorite) => (favorite.name !== track.name || favorite.artist !== track.artist));
        setOurFavorites(updatedFavorites);
        // Update the liked songs in localStorage
        localStorage.setItem('ourFavorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div>
            <h1>OurSound</h1>
            <ul>
                {ourFavorites.length > 0 ? (
                    ourFavorites.map((favorite, index) => (
                        <li key={index}>
                            <p>{favorite.name}</p>
                            <p>{favorite.artist}</p>
                            <button onClick={() => removeTrackFromOurSound(favorite)}>Remove</button>
                        </li>
                    ))
                ) : (
                    <p>No favorites found.</p>
                )}
            </ul>
            <button onClick={() => addTrackToOurSound({ name: 'New Track', artist: 'New Artist' })}>Add New Track
            </button>
        </div>
    );
}
