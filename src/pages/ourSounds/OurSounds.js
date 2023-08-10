// import './OurSounds.css';
// import React, { useState } from "react";
// import axios from "axios";
// import SearchResults from "../../components/searchresults/SearchResults";
// import Spinner from "../../components/spinner/Spinner";
//
// export default function OurSound() {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState({
//         albummatches: {
//             album: []
//         },
//     });
//     const [ourFavorites, setOurFavorites] = useState([]);
//     const [loading, setLoading] = useState(false);
//
//     const fetchAlbumDetails2 = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//
//         try {
//             const token = process.env.REACT_APP_LASTFM_TOKEN;
//             const url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchQuery}&api_key=${token}&format=json`;
//             const response = await axios.get(url);
//             console.log(response)
//             const uniqueAlbums = [];
//             const uniqueMbidSet = new Set();
//
//             for (const album of response.data.results.albummatches.album) {
//                 if (!uniqueMbidSet.has(album.mbid)) {
//                     uniqueMbidSet.add(album.mbid);
//                     const albumDetails = await fetchAlbumDetails2(album.mbid);
//                     if (albumDetails) {
//                         album.tracks = albumDetails.album.tracks.track;
//                     }
//                     uniqueAlbums.push(album);
//                 }
//             }
//
//             setSearchResults({ albummatches: { album: uniqueAlbums } });
//         } catch (err) {
//             console.log(err);
//             setSearchResults({
//                 albummatches: {
//                     album: [],
//                 },
//             });
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const addTrackToOurSound = (track) => {
//         const isTrackInList = ourFavorites.some(
//             (favorite) => favorite.name === track.name && favorite.artist === track.artist
//         );
//
//         // Check if the number of favorites exceeds 10
//         if (ourFavorites.length >= 10) {
//             alert('You have already added 10 favorite songs. Remove songs from the list.');
//             return;
//         }
//         if (!isTrackInList) {
//             const updatedFavorites = [...ourFavorites, track];
//             setOurFavorites(updatedFavorites);
//             // Update the liked songs in localStorage
//             localStorage.setItem('ourFavorites', JSON.stringify(updatedFavorites));
//         }
//     };
//
//     const removeTrackFromOurSound = (track) => {
//         const updatedFavorites = ourFavorites.filter(
//             (favorite) => favorite.name !== track.name || favorite.artist !== track.artist
//         );
//         setOurFavorites(updatedFavorites);
//         // Update the liked songs in localStorage
//         localStorage.setItem('ourFavorites', JSON.stringify(updatedFavorites));
//     };
//
//     console.log("Results:", searchResults)
//
//     return (
//         <div>
//             <h1>OurSound</h1>
//             <div className="container-our-sounds">
//                 <div>
//                     <form className="form-search-size" onSubmit={fetchAlbumDetails2}>
//                         <div>
//                             <input
//                                 className="input-field"
//                                 type = "text"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                             <button className="search-button" type="submit">
//                                 Search
//                             </button>
//                         </div> {/* ... (Form inputs) */}
//                     </form>
//                     <div>
//                         {loading ? (
//                             <Spinner />
//                         ) : (
//                             <SearchResults results={searchResults} onAddToFavorites={addTrackToOurSound} />
//                         )}
//                     </div>
//                 </div>
//                 <ol>
//                     {ourFavorites.length > 0 ? (
//                         ourFavorites.map((favorite, index) => (
//                             <li key={index} className="list-items">{index + 1}.
//                                 <a
//                                     href={`https://www.last.fm/search?q=${encodeURIComponent(favorite.name)}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                 >
//                                     <p>{favorite.name }</p>
//                                     <p>{favorite.artist.name}</p>
//                                 </a>{" "}
//                                 <button onClick={() => removeTrackFromOurSound(favorite)}>Remove</button>
//                             </li>
//                         ))
//                     ) : (
//                         <p className="list-items">No favorites found.</p>
//                     )}
//                 </ol>
//             </div>
//         </div>
//     );
// }


// import "./OurSounds.css"
// import React, {useEffect, useState} from 'react';
//
// export default function OurSounds() {
//     const [ourFavorites, setOurFavorites] = useState('');
//
//     useEffect(() => {
//         const storedFavorites = JSON.parse(localStorage.getItem("ourFavorites") || "[]");
//         setOurFavorites(storedFavorites);
//         console.log(ourFavorites)
//     }, []);
//
//
//     const handleRemoveOurFavorite = (song) => {
//         const updatedOurFavorites = ourFavorites.filter((item) => item !== song);
//         setOurFavorites(updatedOurFavorites);
//         localStorage.setItem("ourFavorites", JSON.stringify(updatedOurFavorites));
//     };
//
//     return (
//         <>
//             <div className="background-container">
//                 <ol>
//                     {ourFavorites.length > 0 ? (
//                         ourFavorites.map((favorite, index) => (
//                             <li key={index} className="list-items">{index + 1}.
//                                 <a
//                                     href={`https://www.last.fm/search?q=${encodeURIComponent(favorite.name)}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                 >
//                                     <p>{favorite.name }</p>
//                                     <p>{favorite.artist.name}</p>
//                                 </a>{" "}
//                                 <div className="border-for-delete">
//                                     <button className="delete-button" onClick={() => handleRemoveOurFavorite(favorite)}>
//                                         delete song
//                                     </button>
//                                 </div>
//                             </li>
//                         ))
//                     ) : (
//                         <p className="list-items">No favorites found.</p>
//                     )}
//                 </ol>
//                 <div className="position-button">
//                     <button className="button-logout">uitloggen</button>
//                 </div>
//             </div>
//         </>
//     );
// }
//
// import './OurSounds.css';
// import React, { useState } from "react";
// import axios from "axios";
// import SearchResults from "../../components/searchresults/SearchResults";
// import Spinner from "../../components/spinner/Spinner";
//
// export default function OurSound() {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState({
//         albummatches: {
//             album: []
//         },
//     });
//     const [ourFavorites, setOurFavorites] = useState([]);
//     const [loading, setLoading] = useState(false);
//
//     const fetchAlbumDetails = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//
//         try {
//             const token = process.env.REACT_APP_LASTFM_TOKEN;
//             const url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchQuery}&api_key=${token}&format=json`;
//             const response = await axios.get(url);
//
//             const uniqueAlbums = [];
//             const uniqueMbidSet = new Set();
//
//             for (const album of response.data.results.albummatches.album) {
//                 if (!uniqueMbidSet.has(album.mbid)) {
//                     uniqueMbidSet.add(album.mbid);
//                     const albumDetails = await fetchAlbumDetails(album.mbid);
//                     if (albumDetails) {
//                         album.tracks = albumDetails.album.tracks.track;
//                     }
//                     uniqueAlbums.push(album);
//                 }
//             }
//
//             setSearchResults({ albummatches: { album: uniqueAlbums } });
//         } catch (err) {
//             console.log(err);
//             setSearchResults({
//                 albummatches: {
//                     album: [],
//                 },
//             });
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const addTrackToOurSound = (track) => {
//         const isTrackInList = ourFavorites.some(
//             (favorite) => favorite.name === track.name && favorite.artist === track.artist
//         );
//
//         // Check if the number of favorites exceeds 10
//         if (ourFavorites.length >= 10) {
//             alert('You have already added 10 favorite songs. Remove songs from the list.');
//             return;
//         }
//         if (!isTrackInList) {
//             const updatedFavorites = [...ourFavorites, track];
//             setOurFavorites(updatedFavorites);
//             // Update the liked songs in localStorage
//             localStorage.setItem('ourFavorites', JSON.stringify(updatedFavorites));
//         }
//     };
//
//     const removeTrackFromOurSound = (track) => {
//         const updatedFavorites = ourFavorites.filter(
//             (favorite) => favorite.name !== track.name || favorite.artist !== track.artist
//         );
//         setOurFavorites(updatedFavorites);
//         // Update the liked songs in localStorage
//         localStorage.setItem('ourFavorites', JSON.stringify(updatedFavorites));
//     };
//
//     console.log("Results:", searchResults)
//
//     return (
//         <div>
//             <h1>OurSound</h1>
//             <div className="container-our-sounds">
//                 <div>
//                     <form className="form-search-size" onSubmit={fetchAlbumDetails}>
//                         <div>
//                             <input
//                                 className="input-field"
//                                 type = "text"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                             <button className="search-button" type="submit">
//                                 Search
//                             </button>
//                         </div> {/* ... (Form inputs) */}
//                     </form>
//                     <div>
//                         {loading ? (
//                             <Spinner />
//                         ) : (
//                             <SearchResults results={searchResults} onAddToFavorites={addTrackToOurSound} />
//                         )}
//                     </div>
//                 </div>
//                 <ol>
//                     {ourFavorites.length > 0 ? (
//                         ourFavorites.map((favorite, index) => (
//                             <li key={index} className="list-items">{index + 1}.
//                                 <a
//                                     href={`https://www.last.fm/search?q=${encodeURIComponent(favorite.name)}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                 >
//                                     <p>{favorite.name }</p>
//                                     <p>{favorite.artist.name}</p>
//                                 </a>{" "}
//                                 <button onClick={() => removeTrackFromOurSound(favorite)}>Remove</button>
//                             </li>
//                         ))
//                     ) : (
//                         <p className="list-items">No favorites found.</p>
//                     )}
//                 </ol>
//             </div>
//         </div>
//     );
// }

import "./OurSounds.css"
import React, { useEffect, useState } from 'react';


export default function OurSounds() {
 const [ourFavorites, setOurFavorites] =useState([]);

    useEffect(() => {
        const storedOurFavorites = JSON.parse(localStorage.getItem('ourFavorites') || '[]');
        setOurFavorites(storedOurFavorites);
    }, []);

    const handleAdminAction = (track) => {
      console.log("Admin action for:", track.name, track.artist);
    };


    const handleRemoveOurFavorite = (track) => {
    const updatedOurFavorites = ourFavorites.filter((favorite) => favorite.name !== track.name || favorite.artist !== track.artist);
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


