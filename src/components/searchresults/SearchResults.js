
import React from "react";
import {AuthContext} from "../../context/AuthContext";
import {useContext} from "react";

export default function SearchResults({ results, onAddToFavorites, handleAdminAction }) {
const { user } = useContext(AuthContext);
    console.log(user)

    return (
        <>
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
                                <li key={track.name} className="track-entry">
                                    <div className="list-item">

                                        <a href={track.url} target="_blank" rel="noreferrer">
                                            {track.name}
                                        </a>
                                        {(user.roles[0] === 'ROLE_ADMIN') &&
                                        <button className="admin-button" onClick={() => handleAdminAction(track)}>
                                            admin
                                        </button>}
                                    </div>
                                    {(user.roles[0] === 'ROLE_USER') &&
                                    <button className="like-button" onClick={() => onAddToFavorites(track)}>
                                        Like
                                    </button>}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="tracks-not-found">No tracks found for this album.</p>
                    )}
                </li>
            ))}
        </ul>
        </>
    );
}