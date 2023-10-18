import "./MySounds.css"
import React, {useEffect, useState, useContext} from 'react';
import LogoutButton from "../../components/logoutButton/LogoutButton";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import SimilarTracksModal from "../../components/similarTracksModal/SimilarTracksModal";

export default function MySounds() {
    const [myFavorites, setMyFavorites] = useState([]);
    const {user} = useContext(AuthContext);
    const [artistName, setArtist] = useState('');
    const [similarTracks, setSimilarTracks] = useState({});
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);



    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setMyFavorites(storedFavorites);
    }, []);


    const handleRemoveMyFavorite = (track) => {
        const updatedFavorites = myFavorites.filter((favorite) => favorite.name !== track.name || favorite.artist !== track.artist);
        setMyFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
        // const handleClick = (trackNames) => {
        // console.log(trackNames)
        // let name = trackNames;
        // name = name.replaceAll(' ', '+')
        // setArtist(name);
        // console.log(artistName)


    const handleClick = (favorite) => {
        if(favorite && favorite.name) {
            console.log(favorite && favorite.name);

            const modifiedArtist = favorite.artist.name.replaceAll(' ', '+');
            const modifiedName = favorite.name.replaceAll(' ', '+');

        setArtist(modifiedArtist);
        setSelectedTrack(favorite);

        const apiKey = process.env.REACT_APP_LASTFM_TOKEN;

            async function fetchData(){

                try {
                    console.log(modifiedArtist, modifiedName)

                    const res = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${modifiedArtist}&track=${modifiedName}&api_key=${apiKey}&format=json`)
                    console.log(res.data.similartracks.track)

                    // setSimilarTracks(res.data.similartracks.track);

                    const similarTracks = res.data.similartracks.track;
                    const randomTracks = getRandomTracks(similarTracks, 15);
                    setSimilarTracks(randomTracks);


                    console.log('opening modal');
                    setIsModalOpen(true);
                    console.log(isModalOpen);

                } catch (e) {
                    console.error(e)
                }
            }
            void fetchData()

        } else {
            console.error('Invalid or missing favorite object', favorite);
        }
    }

    const openModal = (favorite) => {
        setSelectedTrack(favorite);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedTrack(null);
        setIsModalOpen(false);
    };

    function getRandomTracks(allTracks, count) {
        if (count >= allTracks.length) {
            return shuffleArray(allTracks);
        } else {
            const shuffledTracks = shuffleArray(allTracks);
            return shuffledTracks.slice(0, count);
        }
    }

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
    return (
            <div className="background-container">
                <ol>
                    {myFavorites.length > 0 ? (
                        myFavorites.map((favorite, index) => {
                            if (!favorite || !favorite.name || !favorite.artist) {
                                return null;
                            }
                            return (
                                <li key={index} className="list-items">
                                <span className="list-item-number">
                                {index + 1}.</span>
                                    <a
                                        href={`https://www.last.fm/search?q=${encodeURIComponent(favorite.name)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <p className="track-name">{favorite.name}</p>
                                        <p>{favorite.artist.name}</p>
                                    </a>
                                    {" "}
                                    {(user.roles[0] === 'ROLE_USER') &&
                                        <div className="border-for-delete">
                                            <button className="similar-button" onClick={() => handleClick(favorite)}> similar tracks
                                            </button>
                                            {selectedTrack && selectedTrack.name === favorite.name && (
                                                <div>
                                                    {/*<button onClick={() => setIsModalOpen(true)}>*/}
                                                    {/*</button>*/}
                                                    {/*{isModalOpen && similarTracks.length > 0 && (*/}
                                                    {/*    <SimilarTracksModal*/}
                                                    {/*        isOpen={isModalOpen}*/}
                                                    {/*        similarTracks={similarTracks}*/}
                                                    {/*        onClose={() => setIsModalOpen(false)}*/}
                                                    {/*    />*/}
                                                    {/*)}*/}
                                                </div>
                                                )}

                                            <div className="delete-button-container">
                                            <button className="delete-button"
                                                    onClick={() => handleRemoveMyFavorite(favorite)}>
                                                delete song
                                            </button>
                                            </div>
                                        </div>
                                    }
                                </li>
                            );
                        })
                    ) : (
                        <p className="list-items">No favorites found. Go to search-page to add music.</p>
                    )}
                </ol>
                {isModalOpen && (
                    <div className="modal-container">
                        <SimilarTracksModal
                            isOpen={isModalOpen}
                            similarTracks={similarTracks}
                            onClose={closeModal}
                            selectedTrack={selectedTrack}
                        />
                    </div>
                )}

                <footer className="position-button">
                    <div className="button-logout">
                        <LogoutButton/>
                    </div>
                </footer>

    </div>

    );
}