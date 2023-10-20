import React from "react";
import './SimilarTracksModal.css';




const SimilarTracksModal = ({isOpen, similarTracks, onClose, selectedTrack}) => {

    if (!isOpen) {
        return null;

}
    console.log(similarTracks, isOpen);



//     return (
//         <div className="modal-similar-tracks">
//             <div className="modal-content-similar-tracks">
//                 <span className="close-similar-tracks" onClick={onClose}>&times;</span>
//                 <h2 className= "border-header">Similar Tracks for
//                     <p className= "similar-track-header ">{selectedTrack.name} by {selectedTrack.artist.name}
//                     </p>
//                 </h2>
//                 {similarTracks.length > 0 ? (
//                 <ul>
//                     {similarTracks.map((track, index) => (
//                         <li className="list-items-similar" key={index}>
//                             <div className="scroll-container">
//                             <p>
//                                 <span className="bold-text">
//                                     Track:
//                                 </span> <a href={track.url} target = "_blank" rel="noopener noreferrer" style={{ color: "black"}}>{track.name}</a>
//                             </p>
//                             <p><span className="bold-text">
//                                 Artist:
//                             </span>{track.artist.name}
//                             </p>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//                     );(
//                     <p className="no-similar-tracks-message">No similar tracks found.</p>
//                     )}
//             </div>
//             </div>
//         </div>
//     );
// }
//
// export default SimilarTracksModal

    return (
        <div className="modal-similar-tracks">
            <div className="modal-content-similar-tracks">
                <span className="close-similar-tracks" onClick={onClose}>&times;</span>
                <h2 className="border-header">Similar Tracks for
                    <p className="similar-track-header">{selectedTrack.name} by {selectedTrack.artist.name}</p>
                </h2>
                {similarTracks.length > 0 ? (
                    <ul>
                        {similarTracks.map((track, index) => (
                            <li className="list-items-similar" key={index}>
                                <div className="scroll-container">
                                    <p>
                                        <span className="bold-text">
                                            Track:
                                        </span> <a href={track.url} target="_blank" rel="noopener noreferrer" style={{ color: "black" }}>{track.name}</a>
                                    </p>
                                    <p>
                                        <span className="bold-text">
                                            Artist:
                                        </span>{track.artist.name}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-similar-tracks-message">Ooops, too bad. No similar tracks found. Try other track</p>
                )}
            </div>
        </div>
    );
}

export default SimilarTracksModal;






