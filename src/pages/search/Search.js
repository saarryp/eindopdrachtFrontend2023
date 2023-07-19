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
            const url = `https://api.discogs.com/database/search?q=${query}&token=${token}&{?type,artist,title,thumb}`;
            const response = await axios.get(url)
            setArtists(response.data.results)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }


    // op andeer manier het object van de discogs inzetten waarbij je waarschijnlijk onder "thumb" te vinden is zie body
    // statusnpm start
    // {
    //   "pagination": {
    //     "per_page": 50,
    //     "items": 9,
    //     "page": 1,
    //     "urls": {},
    //     "pages": 1
    //   },
    //   "releases": [

    //
    //     {
    //       "artist": "Nickelback",
    //       "id": 173767,
    //       "main_release": 1905922,
    //       "resource_url": "http://api.discogs.com/masters/173767",
    //       "role": "Main",
    //       "thumb": "https://api-img.discogs.com/12LXbUV44IHjyb6drFZOTQxgCqs=/fit-in/90x90/filters:strip_icc():format(jpeg):mode_rgb()/discogs-images/R-1905922-1251540516.jpeg.jpg",
    //       "title": "Leader Of Men",
    //       "type": "master",
    //       "year": 1999
    //     }
    //   ]
    // }


    return (

          <div className="container-photo-search-engine">
              <div className="position-button-and-results">
              {/*<div className="background-photo"></div>*/}
                <form onSubmit={handleSubmit}>
                    <h2>Find Artist</h2>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <button className="search-button" type="submit">Search</button>
                </form>
            <div>
                <ul className="ul-position">
                   {artists.map((artist) =>
                       <li className="list-item">
                           <span key={artist.id}>
                           {artist.thumb && <img src={artist.thumb} alt={artist.title}/>}</span>
                           <h2> {artist.title}</h2>
                     </li>
                  )}
                </ul>
            </div>
            </div>
          </div>
    );
}



