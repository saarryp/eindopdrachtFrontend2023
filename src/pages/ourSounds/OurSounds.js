import './OurSounds.css';
import React, { useState } from "react";
import axios from "axios";
import SearchResults from "../../components/serachresults/SearchResults";
import Spinner from "../../components/spinner/Spinner";


export default function OurSound() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({
        albummatches: {
            album: []
        },
    });
    const [ourFavorites, setOurFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = process.env.REACT_APP_LASTFM_TOKEN;
            const url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchQuery}&api_key=${token}&format=json`;
            const response = await axios.get(url);

            const uniqueAlbums = [];
            const uniqueMbidSet = new Set();
            for (const album of response.data.results.albummatches.album) {
                if (!uniqueMbidSet.has(album.mbid)) {
                    uniqueMbidSet.add(album.mbid);
                    const albumDetails = await handleSearch(album.mbid);
                    if (albumDetails) {
                        album.tracks = albumDetails.album.tracks.track;
                    }
                    uniqueAlbums.push(album);
                }
            }
        } catch (err) {
            console.log(err);
            setSearchResults([]);
        } finally {
        setLoading(false);
    }
};
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

    const removeTrackFromOurSound = (track) => {
        const updatedFavorites = ourFavorites.filter((favorite) => (favorite.name !== track.name || favorite.artist !== track.artist));
        setOurFavorites(updatedFavorites);
        // Update the liked songs in localStorage
        localStorage.setItem('ourFavorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div>
            <h1>OurSound</h1>
            <div className="container-photo-search-engine">
                <div className="position-button-and-results">
                    <form className="form-search-size" onSubmit={handleSearch}>
                       <div>
                           <input
                               className="input-field"
                               type = "text"
                               value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}
                               />
                           <button className="search-button" type="submit">
                               Search
                           </button>
                       </div> {/* ... (Form inputs) */}
                    </form>
                    <div>
                        {loading ? (
                            <Spinner />
                        ) : (
                            <SearchResults results={searchResults} onAddToFavorites={addTrackToOurSound} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}