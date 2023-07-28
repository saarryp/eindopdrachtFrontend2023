import "./Search.css";
import React, { useState,} from "react";
import axios from "axios";
import Spinner from "../../components/spinner/Spinner";

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({
        albummatches: {
            album: [],
        },
    });
    const [loading,setLoading] = useState(false);
    // const [likedTracks, setLikedTracks] = useState([])

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

    // useEffect(() => {
    //     const storedLikedSongs = localStorage.getItem('likedTracks);
    //     if (storedLikedSongs){
    //         setLikedTracks(JSON.parse(storedLikedSongs));
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     localStorage.setItem('likedTracks', JSON.stringify(likedTracks));
    // }, [likedTracks]);


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


    const handleAlbumClick = async (mbid) => {
        const albumDetails = await fetchAlbumDetails(mbid);
        console.log(albumDetails);
    };

    return (
        <div className="container-photo-search-engine">
            <div className="position-button-and-results">
                <form className="form-search-size" onSubmit={handleSubmit}>
                    <div className="spinner-container">
                    <input className="input-field"
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
                    <ul className="ul-position ul-albums">
                        {results.albummatches.album.map((album) => (
                            <li key={`${album.mbid}-${album.name}`} onClick={() => handleAlbumClick(album.mbid)}>
                                <div className="album-info">
                                    <span>
                                    {album.image && <img src={album.image[3]["#text"]} alt={album.name} />}
                                    </span>
                                    <h2 className="artist">{album.artist}</h2>
                                    <p className="title">{album.name}</p>
                                </div>
                                    {album.tracks && album.tracks.length > 0 ? (
                                    <ul className="track-list">
                                        {album.tracks.map((track) => (
                                            <li key={track.name}> <a href={track.url} target="_blank" rel="noreferrer"> {track.name}</a></li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="tracks-not-found">No tracks found for this album.</p>
                                )}
                            </li>
                        ))}
                    </ul>
                    )}
                </div>
            </div>
        </div>
    );
}




