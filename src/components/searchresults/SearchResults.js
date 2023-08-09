// import React from "react";
//
// export default function SearchResults({ results, onAddToFavorites }) {
//
//     return (
//         <ul className="ul-position ul-albums">
//             {results.albummatches.album.map((album) => (
//                 <li key={`${album.mbid}-${album.name}`}>
//                     <div className="album-info">
//                         <span>
//                             {album.image && <img src={album.image[3]["#text"]} alt={album.name} />}
//                         </span>
//                         <h2 className="artist">{album.artist}</h2>
//                         <p className="title">{album.name}</p>
//                     </div>
//                     {album.tracks && album.tracks.length > 0 ? (
//                         <ul className="track-list">
//                             {album.tracks.map((track) => (
//                                 <li key={track.name}>
//                                     <span className="container-tracks-like">
//                                         <button className="admin-button" onClick={() => console.log("admin action")}>
//                                         admin
//                                     </button>
//                                         <a href={track.url} target="_blank" rel="noreferrer">
//                                             {track.name}
//                                         </a>
//                                     </span>
//                                     <div>
//                                     <button className="like-button" onClick={() => onAddToFavorites(track)}>
//                                         Like
//                                     </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="tracks-not-found">No tracks found for this album.</p>
//                     )}
//                 </li>
//             ))}
//         </ul>
//     );
// }

import React from "react";

export default function SearchResults({ results, onAddToFavorites }) {

    return (
        <ul className="ul-position ul-albums">
            {results.albummatches.album.map((album) => (
                <li key={`${album.mbid}-${album.name}`}>
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
                                <li key={track.name}>
                                    <span className="container-tracks-like">
                                        <a href={track.url} target="_blank" rel="noreferrer">
                                            {track.name}
                                        </a>
                                    </span>
                                    <button className="like-button" onClick={() => onAddToFavorites(track)}>
                                        Like
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="tracks-not-found">No tracks found for this album.</p>
                    )}
                </li>
            ))}
        </ul>
    );
}