import React from "react";
import './SimilarTracksModal.css';


const SimilarTracksModal = ({isOpen, similarTracks, onClose, selectedTrack}) => {
    if (!isOpen) return null;
console.log(similarTracks, isOpen);



    return (
        <div className="modal-similar-tracks">
            <div className="modal-content-similar-tracks">
                <span className="close-similar-tracks" onClick={onClose}>&times;</span>
                <h2 className= "border-header">Similar Tracks for
                    <p className= "similar-track-header ">{selectedTrack.name}  {selectedTrack.artist.name}
                    </p></h2>
                <ul>
                    {similarTracks.map((track, index) => (
                        <li className="list-items-similar" key={index}>
                            <p><span className="bold-text"> Track: </span> {track.name}</p>
                            <p><span className="bold-text"> Artist: </span>{track.artist.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SimilarTracksModal