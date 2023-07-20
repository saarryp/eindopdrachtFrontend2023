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
            return response.data.album;
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
            response.data.results.albummatches.album.forEach((album) => {
                if (!uniqueMbidSet.has(album.mbid)) {
                    uniqueMbidSet.add(album.mbid);
                    uniqueAlbums.push(album);
                }
            });

            setResults({ albummatches: { album: uniqueAlbums } });
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAlbumClick = async (mbid) => {
        const albumDetails = await fetchAlbumDetails(mbid);
        // Here, you can do something with the albumDetails, such as displaying them in a modal or a separate component
        console.log(albumDetails);
    };

    return (
        <div className="container-photo-search-engine">
            <div className="position-button-and-results">
                <form className="form-search-size" onSubmit={handleSubmit}>
                    <input
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
                            <li key={album.mbid} onClick={() => handleAlbumClick(album.mbid)}>
                <span>
                  {album.image && <img src={album.image[2]["#text"]} alt={album.name} />}
                </span>
                                <h2 className="artist">{album.artist}</h2>
                                <p className="title">{album.name}</p>
                                {/* You can add more album details here if needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}




// import "./Search.css"
// import React, {useState} from "react";
// import axios from "axios";
//
// export default function Search() {
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState({
//         albummatches: {
//             album: [],
//         },
//     });
//
//     const fetchAlbumDetails = async (mbid) => {
//         try {
//             const token = process.env.REACT_APP_LASTFM_TOKEN;
//             const url = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&mbid=${mbid}&api_key=${token}&format=json`;
//             const response = await axios.get(url);
//             return response.data.album;
//         } catch (err) {
//             console.log(err);
//             return null;
//         }
//     };
//
//     let handleSubmit = async (e) => {
//         e.preventDefault();
//
//         try {
//             const token = process.env.REACT_APP_LASTFM_TOKEN;
//             const url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${token}&format=json`;
//             const response = await axios.get(url);
//             setResults(response.data.results);
//             console.log(response.data);
//         } catch (err) {
//             console.log(err);
//         }
//     };
//
//     const handleAlbumClick = async (mbid) => {
//         const albumDetails = await fetchAlbumDetails(mbid);
//         // Here, you can do something with the albumDetails, such as displaying them in a modal or a separate component
//         console.log(albumDetails);
//     };
//
//     return (
//         <div className="container-photo-search-engine">
//             <div className="position-button-and-results">
//                 <form className="form-search-size" onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                     />
//                     <button className="search-button" type="submit">
//                         Search
//                     </button>
//                 </form>
//                 <div>
//                     <ul className="ul-position">
//                         {results.albummatches.album.map((album) => (
//                             <li key={album.mbid} onClick={() => handleAlbumClick(album.mbid)}>
//                                 <span>
//                                         {album.image && (
//                                         <img src={album.image[2]["#text"]} alt={album.name} />
//                                         )}
//                                 </span>
//                                 <h2 className="artist">{album.artist}</h2>
//                                 <p className="title">{album.name}</p>
//                                 {/* You can add more album details here if needed */}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// // export default function Search() {
// //
// //     const [query, setQuery] = useState('')
// //     // const [topTracks, setTopTracks] = useState([])
// //     const [results, setResults] = useState({
// //         albummatches: {
// //             album: [],
// //         }
// //     })
// //
// //
// //     let handleSubmit = async (e) => {
// //         const token = process.env.REACT_APP_LASTFM_TOKEN
// //         e.preventDefault()
// //
// //         try {
// //
// //             // const url =`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=cher&api_key=${token}&format=json`
// //             const url = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${token}&format=json&`;
// //
// //             const response = await axios.get(url);
// //             setResults(response.data.results)
// //             console.log(response.data)
// //         } catch (err) {
// //             console.log(err)
// //         }
// //     }
// //
// //     return (
// //
// //         <div className="container-photo-search-engine">
// //             <div className="position-button-and-results">
// //                 <form onSubmit={handleSubmit}>
// //                     <h2>Find album</h2>
// //                     <input
// //                         type="text"
// //                         value={query}
// //                         onChange={(e) => setQuery(e.target.value)}/>
// //                     <button className="search-button" type="submit">
// //                         Search
// //                     </button>
// //                 </form>
// //                 <div>
// //                     <ul className="ul-position">
// //                         {results.albummatches.album && results.albummatches.album.map((album) => (
// //                             <li key={album.mbid}>
// //                                 <span>
// //                                     {album.image && (
// //                                     <img src={album.image[3]["#text"]} alt={album.name} />
// //                                     )}
// //                                 </span>
// //                                 <h2 className="artist">{album.artist}</h2>
// //                                 <p className="title">{album.name}</p>
// //                                 <ul>
// //                                     {album.image.map((track) => (
// //                                         <li key={track.name}>{track.name}</li>
// //                                     ))}
// //                                 </ul>
// //                     {/*<ul className="ul-position">*/}
// //                     {/*    {topTracks.map((track) => (*/}
// //                     {/*        <li key={track.id}>*/}
// //                     {/*            <span>*/}
// //                     {/*                {track.image && <img src={track.image[0]['#text']} alt={track.name} />}*/}
// //                     {/*            </span>*/}
// //                     {/*            <h2 className="artist">{track.artist.name}</h2>*/}
// //                     {/*            <p className="title">{track.name}</p>*/}
// //                      </li>
// //                        ))}
// //                     </ul>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }
// //
//
//
// // let handleSubmit = async (e) => {
//     //     const token = process.env.REACT_APP_DISCOGS_TOKEN
//     //     e.preventDefault()
//     //
//     //     try {
//     //         const url = `https://api.discogs.com/database/search?q=${query}&token=${token}&{?type,artist,title,thumb}`;
//     //         const response = await axios.get(url)
//     //         setArtists(response.data.results)
//     //         console.log(response.data)
//     //     } catch (err) {
//     //         console.log(err)
//     //     }
//     // }
//
//
//     // op andeer manier het object van de discogs inzetten waarbij je waarschijnlijk onder "thumb" te vinden is zie body
//     // statusnpm start
//     // {
//     //   "pagination": {
//     //     "per_page": 50,
//     //     "items": 9,
//     //     "page": 1,
//     //     "urls": {},
//     //     "pages": 1
//     //   },
//     //   "releases": [
//
//     //
//     //     {
//     //       "artist": "Nickelback",
//     //       "id": 173767,
//     //       "main_release": 1905922,
//     //       "resource_url": "http://api.discogs.com/masters/173767",
//     //       "role": "Main",
//     //       "thumb": "https://api-img.discogs.com/12LXbUV44IHjyb6drFZOTQxgCqs=/fit-in/90x90/filters:strip_icc():format(jpeg):mode_rgb()/discogs-images/R-1905922-1251540516.jpeg.jpg",
//     //       "title": "Leader Of Men",
//     //       "type": "master",
//     //       "year": 1999
//     //     }
//     //   ]
//     // }
//
//
// //     return (
// //
// //           <div className="container-photo-search-engine">
// //               <div className="position-button-and-results">
// //               {/*<div className="background-photo"></div>*/}
// //                 <form onSubmit={handleSubmit}>
// //                     <h2>Find Artist</h2>
// //                     <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
// //                     <button className="search-button" type="submit">Search</button>
// //                 </form>
// //             <div>
// //                 <ul className="ul-position">
// //                    {artists.map((artist) =>
// //                        <li className="list-item">
// //                            <span key={artist.id}>
// //                            {artist.thumb && <img src={artist.thumb} alt={artist.title}/>}</span>
// //                            <h2> {artist.title}</h2>
// //                      </li>
// //                   )}
// //                 </ul>
// //             </div>
// //             </div>
// //           </div>
// //     );
// // }
//
//
//
