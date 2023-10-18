import React from "react";
import './SimilarTracksModal.css';

const SimilarTracksModal = ({isOpen, similarTracks, onClose, selectedTrack}) => {
    if (!isOpen) return null;
console.log(similarTracks, isOpen);

    return (
        <div className="modal-similar-tracks">
            <div className="modal-content-similar-tracks">
                <span className="close-similar-tracks" onClick={onClose}>&times;</span>
                <h2>Similar Tracks for:
                    <p>{selectedTrack.name}  {selectedTrack.artist.name}
                    </p></h2>
                <ul>
                    {similarTracks.map((track, index) => (
                        <li key={index}>
                            <p>Track: {track.name}</p>
                            <p>Artist: {track.artist.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SimilarTracksModal