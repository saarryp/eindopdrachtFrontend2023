import "./Search.css";
import React, {useState} from "react";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";
import SearchResults from "../../components/searchresults/SearchResults";
import WarningLimit from "../../components/warningLimit/WarningLimit";

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({
        albummatches: {
            album: [],
        },
    });
    const [loading, setLoading] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const closeWarningModal = () => {
        setIsWarningModalOpen(false);
    }

    const fetchAlbumDetails = async (mbid) => {
        try {
            const token = process.env.REACT_APP_LASTFM_TOKEN;
            const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&mbid=${mbid}&api_key=${token}&format=json`;
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };


    const favoriteSong = (track) => {
        const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const isSongLiked = currentFavorites.some((favorite) => favorite.name === track.name && favorite.artist === track.artist);

        if (currentFavorites.length >= 10) {
            setIsWarningModalOpen(true);
            return;
        }

        let updatedFavorites;
        if (isSongLiked) {
            updatedFavorites = currentFavorites.filter((favorite) => (favorite.name !== track.name || favorite.artist !== track.artist));
        } else {
            const {name, artist} = track;
            updatedFavorites = [...currentFavorites, {name, artist}];
        }

        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };


    const handleAdminAction = (track) => {
        const currentOurFavorites = JSON.parse(localStorage.getItem('ourFavorites') || '[]');
        const isOurSongLiked = currentOurFavorites.some((favorite) => favorite.name === track.name && favorite.artist === track.artist);

        if (currentOurFavorites.length >= 10) {
            setIsWarningModalOpen(true)
            return;
        }

        let updatedOurFavorites;
        if (isOurSongLiked) {
            updatedOurFavorites = currentOurFavorites.filter((favorite) => (favorite.name !== track.name || favorite.artist !== track.artist));
        } else {
            const {name, artist} = track;
            updatedOurFavorites = [...currentOurFavorites, {name, artist}];
        }

        localStorage.setItem('ourFavorites', JSON.stringify(updatedOurFavorites));
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

            setResults({albummatches: {album: uniqueAlbums}});
            setQuery('')
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-photo-search-engine">
            <WarningLimit isOpen={isWarningModalOpen} onClose={closeWarningModal}/>
            <form className={`form-search-size ${loading ? 'loading' : ''}`} onSubmit={handleSubmit}>
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
                    {loading && (<div className="spinner-overlay">
                            <Spinner/>
                        </div>
                    )}
                </div>
            </form>
            <SearchResults
                results={results}
                onAddToFavorites={favoriteSong}
                handleAdminAction={handleAdminAction}/>
        </div>
    );
}





