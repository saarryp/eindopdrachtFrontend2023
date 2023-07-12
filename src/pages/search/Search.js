import "./Search.css"
import React, {useState} from "react";
import axios from "axios";

export default function Search() {

    const [query, setQuery] = useState('')
    const [artists, setArtists] = useState([])

    let handleSubmit = async (e) => {
        const token = process.env.REACT_APP_DISCOGS_TOKEN
        const url = 'https://api.discogs.com//database/search'
        e.preventDefault()

        try {
            let res = await fetch(`${url}?q=${query}&token=${token}&type=artist`, {
                method: 'GET'
            })
            let resJson = await res.json()
            if (res.status === 200) {
                setArtists(resJson.results)
            } else {
                console.log(resJson)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section>
            <h1> Zoeken zoeken zoeken</h1>
            <form onSubmit={handleSubmit}>
                <h2>Find Artist</h2>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button type="submit">Search</button>
            </form>
            <div>
                <ul>
                    {artists.map((artist) => (
                        <li key={artist.id}>{artist.title}</li>
                    ))}
                </ul>
            </div>
        </section>
    )
}





    // return (
    //     <>
    //         <h1>Searching SaaR.. is ze hier of daar</h1>
    //     </>
    // )
// }