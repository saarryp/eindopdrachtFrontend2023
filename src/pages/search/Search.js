import "./Search.css"
import React, {useState} from "react";
import axios from "axios";


export default function Search() {

    const [query, setQuery] = useState('')
    const [artists, setArtists] = useState([])


    let handleSubmit = async (e) => {
        const token = process.env.REACT_APP_DISCOGS_TOKEN
        e.preventDefault()

        try {
            const url = `https://api.discogs.com/database/search?q=${query}&token=${token}&type=artist`;
            const response = await axios.get(url)
            setArtists(response.data.results)
        } catch (err) {
            console.log(err)
        }
    }


    return (

          <div className="container-photo-search-engine">
              <div className="background-photo"></div>
                <form onSubmit={handleSubmit}>
                    <h2>Find Artist</h2>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <button className="search-button" type="submit">Search</button>
                </form>
            <div>
                <ul>
                    {artists.map((artist) => (
                        <li key={artist.id}>{artist.title}</li>
                    ))}
                </ul>
            </div>
          </div>
    );
}





