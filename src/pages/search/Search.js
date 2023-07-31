
import "./Search.css";
import React, {useState} from "react";
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

    const favoriteSong = (song) => {
        console.log(song);

        // Get the current liked songs from localStorage
        const currentFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        // Check if the song is already in the liked songs list
        const isSongLiked = currentFavorites.includes(song);

        // Check if the number of favorites exceeds 10
        if (currentFavorites.length >= 10) {
            alert("You have more than 10 favorite songs. Delete song in your page");
            return;
        }

        let updatedFavorites;
        if (isSongLiked) {
            updatedFavorites = currentFavorites.filter((item) => item !== song);
        } else {
            updatedFavorites = [...currentFavorites, song];
        }

        // Update the liked songs in localStorage
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        console.log(updatedFavorites);
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
                                                <>
                                                <li key={track.name}> <a href={track.url} target="_blank" rel="noreferrer"> {track.name}</a></li>
                                                <div>
                                                <button onClick={() => favoriteSong(track)}>
                                                    like
                                                </button>
                                                </div>
                                                </>
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
// import "./Search.css";
// import React, { useState, useEffect} from "react";
// import axios from "axios";
// import Spinner from "../../components/spinner/Spinner";
//
// export default function Search() {
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState({
//         albummatches: {
//             album: [],
//         },
//     });
//     const [loading,setLoading] = useState(false);
//     const [heartedSongs, setHeartedSongs] = useState([])
//
//     const fetchAlbumDetails = async (mbid) => {
//         try {
//             const token = process.env.REACT_APP_LASTFM_TOKEN;
//              const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&mbid=${mbid}&api_key=${token}&format=json`;
//             const response = await axios.get(url);
//             return response.data;
//         } catch (err) {
//             console.log(err);
//             return null;
//         }
//     };
//
//     // const handleHeartClick = (trackName) => {
//     //     if (heartedSongs.includes(trackName)) {
//     //         setHeartedSongs(heartedSongs.filter((name) => name !== trackName));
//     //     } else {
//     //         setHeartedSongs([...heartedSongs, trackName]);
//     //     }
//     // };
//
//     const handleHeartClick = (albumIndex, trackIndex) => {
//         const updatedResults = { ...results };
//         const trackName = updatedResults.albummatches.album[albumIndex].tracks[trackIndex].name;
//
//         if (heartedSongs.includes(trackName)) {
//             setHeartedSongs(heartedSongs.filter((name) => name !== trackName));
//             updatedResults.albummatches.album[albumIndex].tracks[trackIndex].hearted = false;
//         } else {
//             setHeartedSongs([...heartedSongs, trackName]);
//             updatedResults.albummatches.album[albumIndex].tracks[trackIndex].hearted = true;
//         }
//
//         setResults(updatedResults);
//     };
//
//
//
//
//     let handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//
//         try {
//             const token = process.env.REACT_APP_LASTFM_TOKEN;
//             const url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${token}&format=json`;
//             const response = await axios.get(url);
//
//             const uniqueAlbums = [];
//             const uniqueMbidSet = new Set();
//             for (const album of response.data.results.albummatches.album) {
//                 if (!uniqueMbidSet.has(album.mbid)) {
//                     uniqueMbidSet.add(album.mbid);
//                     const albumDetails = await fetchAlbumDetails(album.mbid);
//                     if (albumDetails && albumDetails.album && albumDetails.album.tracks.track && Array.isArray (albumDetails.album.tracks.track)) {
//                         album.tracks = albumDetails.album.tracks.track.map((track) => ({...track,
//                         hearted: heartedSongs.includes(track.name),
//                         }));
//                     } else {
//                         album.tracks = [];
//                     }
//                     uniqueAlbums.push(album);
//                 }
//             }
//
//             setResults({ albummatches: { album: uniqueAlbums } });
//             setQuery('')
//         } catch (err) {
//             console.log(err);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//
//     const handleAlbumClick = async (mbid) => {
//         const albumDetails = await fetchAlbumDetails(mbid);
//         console.log(albumDetails);
//     };
//
//     useEffect(() => {
//         const storedHeartedSongs = JSON.parse(localStorage.getItem('heartedSongs') || '[]');
//         setHeartedSongs(storedHeartedSongs);
//
//         // Initialize the hearted property of each track in the state
//         const updatedResults = { ...results };
//         updatedResults.albummatches.album.forEach((album) => {
//             album.tracks.forEach((track) => {
//                 track.hearted = storedHeartedSongs.includes(track.name);
//             });
//         });
//         setResults(updatedResults);
//     }, []);
//
//
//
//     return (
//         <div className="container-photo-search-engine">
//             <div className="position-button-and-results">
//                 <form className="form-search-size" onSubmit={handleSubmit}>
//                     <div className="spinner-container">
//                     <input className="input-field"
//                         type="text"
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                     />
//                     <button className="search-button" type="submit">
//                         Search
//                     </button>
//                     </div>
//                 </form>
//                 <div>
//                     {loading ? (
//                         <Spinner />
//                     ) : (
//                     <ul className="ul-position ul-albums">
//                         {results.albummatches.album.map((album, albumIndex) => (
//                             <li key={`${album.mbid}-${albumIndex}`} onClick={() => handleAlbumClick(album.mbid)}>
//                                 <div className="album-info">
//                                     <span>
//                                     {album.image && <img src={album.image[3]["#text"]} alt={album.name} />}
//                                     </span>
//                                     <h2 className="artist">{album.artist}</h2>
//                                     <p className="title">{album.name}</p>
//                                 </div>
//                                     {album.tracks && album.tracks.length > 0 ? (
//                                     <ul className="track-list">
//                                         {album.tracks.map((track, trackIndex) => (
//                                             <li key={track.name}>
//                                                 <a href={track.url}
//                                                    target="_blank"
//                                                    rel="noreferrer"> {track.name}
//                                                 </a>
//                                                 <span
//                                                     className={`heart-icon ${track.hearted ? 'hearted' : ''}`}
//                                                     onClick={() => handleHeartClick(albumIndex, trackIndex)}
//                                                 >
//                                                 ❤️
//                                                  </span>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 ) : (
//                                     <p className="tracks-not-found">No tracks found for this album.</p>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
//
//
//
//
