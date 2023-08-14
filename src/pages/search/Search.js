
import "./Search.css";
import React, {useState} from "react";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
import SearchResults from "../../components/searchresults/SearchResults";

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({
        albummatches: {
            album: [],
        },
    });
    const [loading, setLoading] = useState(false);

    const fetchAlbumDetails = async (mbid) => {
        try {
            const token = process.env.REACT_APP_LASTFM_TOKEN;
            const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&mbid=${mbid}&api_key=${token}&format=json`;
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            console.log(err);
            return null;
        }
    };


    const favoriteSong = (track) => {
        console.log(track);

        const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isSongLiked = currentFavorites.some((favorite) => favorite.name === track.name && favorite.artist === track.artist);

        // Check if the number of favorites exceeds 10
        if (currentFavorites.length >= 10) {
            alert('You have more than 10 favorite songs. Delete songs in your MySounds page.');
            return;
        }

        let updatedFavorites;
        if (isSongLiked) {
            updatedFavorites = currentFavorites.filter((favorite) => (favorite.name !== track.name || favorite.artist !== track.artist));
        } else {
            const {name, artist} = track;
            updatedFavorites = [...currentFavorites, {name, artist}];
        }

        // Update the liked songs in localStorage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        console.log(updatedFavorites);
    };

    const handleAdminAction = (track) => {
        console.log("Admin action for:", track.name, track.artist);

        const currentOurFavorites = JSON.parse(localStorage.getItem('ourFavorites') || '[]');
        const isOurSongLiked = currentOurFavorites.some((favorite) => favorite.name === track.name && favorite.artist === track.artist);

        if (currentOurFavorites.length >= 10) {
            alert('Admin you have more than 10 favorite songs. Delete songs in your OurSounds page.');
            return;
        }

        let updatedOurFavorites;
        if (isOurSongLiked) {
            updatedOurFavorites = currentOurFavorites.filter((favorite) => (favorite.name !== track.name || favorite.artist !== track.artist));
        } else {
            const {name, artist} = track;
            updatedOurFavorites = [...currentOurFavorites, {name, artist}];
        }

        // Update the liked songs in localStorage
        localStorage.setItem('ourFavorites', JSON.stringify(updatedOurFavorites));
        console.log(updatedOurFavorites);
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = process.env.REACT_APP_LASTFM_TOKEN;
            const url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${token}&format=json`;
            const response = await axios.get(url);

            const uniqueAlbums = [];
            const uniqueMbidSet = new Set();
            for (const album of response.data.results.albummatches.album) {
                if (!uniqueMbidSet.has(album.mbid)) {
                    uniqueMbidSet.add(album.mbid);
                    const albumDetails = await fetchAlbumDetails(album.mbid);
                    if (albumDetails) {
                        album.tracks = albumDetails.album.tracks.track;
                    }
                    uniqueAlbums.push(album);
                }
            }

            setResults({ albummatches: { album: uniqueAlbums } });
            setQuery('')
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-photo-search-engine">
            <div className="position-button-and-results">
                <form className="form-search-size" onSubmit={handleSubmit}>
                    <div className="spinner-container">
                        <input
                            className="input-field"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button className="search-button" type="submit">
                            Search
                        </button>
                    </div>
                </form>
                <div>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <SearchResults
                            results={results}
                            onAddToFavorites={favoriteSong}
                            handleAdminAction={handleAdminAction}/>
                    )}
                </div>
            </div>
        </div>
    );
}





