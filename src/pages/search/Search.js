//
// import "./Search.css";
// import React, {useState} from "react";
// import axios from "axios";
// import Spinner from "../../components/spinner/Spinner";
// import SearchResults from "../../components/searchresults/SearchResults";
//
// export default function Search() {
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState({
//         albummatches: {
//             album: [],
//         },
//     });
//     const [loading, setLoading] = useState(false);
//
//     const fetchAlbumDetails = async (mbid) => {
//         try {
//             const token = process.env.REACT_APP_LASTFM_TOKEN;
//             const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&mbid=${mbid}&api_key=${token}&format=json`;
//             const response = await axios.get(url);
//             return response.data;
//         } catch (err) {
//             console.log(err);
//             return null;
//         }
//     };
//
//
//     const favoriteSong = (track) => {
//         console.log(track);
//
//         const currentOurFavorites = JSON.parse(localStorage.getItem('ourFavorites') || '[]');
//         const currentMyFavorites = JSON.parse(localStorage.getItem('myFavorites') || '[]');
//
//         // const isSongLikedOurFavorites = currentOurFavorites.some((favorite) => favorite.name === track.name && favorite.artist === track.artist);
//         // const isSongLikedInMyFavorites = currentMyFavorites.some((favorite) => favorite.name === track.name && favorite.artist === track.artist);
//
//         // Check if the number of favorites exceeds 10
//         if (currentMyFavorites.length || currentOurFavorites.length >= 10) {
//             alert('You have more than 10 favorite songs. Delete songs in your MySounds page.');
//             return;
//         }
//
//         // let updatedOurFavorites;
//         //  if (isSongLikedOurFavorites) {
//         // updatedOurFavorites = currentOurFavorites.filter((favorite) => (favorite.name !== track.name || favorite.artist !== track.artist));
//         // } else {
//         //    updatedOurFavorites = [...currentOurFavorites, track];
//         //  }
//
//         const updatedOurFavorites = [...currentOurFavorites, track];
//         localStorage.setItem('ourFavorites', JSON.stringify(updatedOurFavorites));
//         console.log(updatedOurFavorites);
//
//         const updatedMyFavorites = [...currentMyFavorites, track]
//         localStorage.setItem('myFavorites', JSON.stringify(updatedMyFavorites));
//         console.log(updatedMyFavorites);
//     };
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
//                     if (albumDetails) {
//                        album.tracks = albumDetails.album.tracks.track;
//                      }
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
//     // const handleAlbumClick = async (mbid) => {
//     //     const albumDetails = await fetchAlbumDetails(mbid);
//     //     console.log(albumDetails);
//     // };
//     return (
//         <div className="container-photo-search-engine">
//             <div className="position-button-and-results">
//                 <form className="form-search-size" onSubmit={handleSubmit}>
//                     <div className="spinner-container">
//                         <input
//                             className="input-field"
//                             type="text"
//                             value={query}
//                             onChange={(e) => setQuery(e.target.value)}
//                         />
//                         <button className="search-button" type="submit">
//                             Search
//                         </button>
//                     </div>
//                 </form>
//                 <div>
//                     {loading ? (
//                         <Spinner />
//                     ) : (
//                         <SearchResults results={results} onAddToFavorites={favoriteSong} />
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
//
//

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
            updatedFavorites = [...currentFavorites, track];
        }

        // Update the liked songs in localStorage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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


    // const handleAlbumClick = async (mbid) => {
    //     const albumDetails = await fetchAlbumDetails(mbid);
    //     console.log(albumDetails);
    // };
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
                        <SearchResults results={results} onAddToFavorites={favoriteSong} />
                    )}
                </div>
            </div>
        </div>
    );
}





