import "./Search.css";
import React, { useState } from "react";
import axios from "axios";

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({
        albummatches: {
            album: [],
        },
    });

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

    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = process.env.REACT_APP_LASTFM_TOKEN;
            const url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${token}&format=json`;
            const response = await axios.get(url);

            // Filter out duplicate albums based on mbid
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
        } catch (err) {
            console.log(err);
        }
    };

    // let handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     try {
    //         const token = process.env.REACT_APP_LASTFM_TOKEN;
    //         const url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${token}&format=json`;
    //         const response = await axios.get(url);
    //
    //         // Filter out duplicate albums based on mbid
    //         const uniqueAlbums = [];
    //         const uniqueMbidSet = new Set();
    //         response.data.results.albummatches.album.forEach((album) => {
    //             if (!uniqueMbidSet.has(album.mbid)) {
    //                 uniqueMbidSet.add(album.mbid);
    //                 uniqueAlbums.push(album);
    //             }
    //         });
    //
    //         setResults({ albummatches: { album: uniqueAlbums } });
    //         console.log(response.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const handleAlbumClick = async (mbid) => {
        const albumDetails = await fetchAlbumDetails(mbid);
        // Here, you can do something with the albumDetails, such as displaying them in a modal or a separate component
        console.log(albumDetails);
    };

    return (
        <div className="container-photo-search-engine">
            <div className="position-button-and-results">
                <form className="form-search-size" onSubmit={handleSubmit}>
                    <input className="input-field"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="search-button" type="submit">
                        Search
                    </button>
                </form>
                <div>
                    <ul className="ul-position">
                        {results.albummatches.album.map((album) => (
                            <li key={`${album.mbid}-${album.name}`}  onClick={() => handleAlbumClick(album.mbid)}>
                                <span>
                                    {album.image && <img src={album.image[2]["#text"]} alt={album.name} />}
                                </span>
                                <h2 className="artist">{album.artist}</h2>
                                <p className="title">{album.name}</p>
                                {album.tracks && album.tracks.length > 0 ? (
                                    <ul className="track-list">
                                        {album.tracks.map((track) => (
                                            <li key={track.name}>
                                                <a href={track.url} target="_blank" rel="noreferrer"> {track.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No tracks found for this album.</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}




