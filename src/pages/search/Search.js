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
            const url = `https://api.discogs.com/database/search?q=${query}&token=${token}&{?type,artist,title}`;
            const response = await axios.get(url)
            setArtists(response.data.results)
        } catch (err) {
            console.log(err)
        }
    }


    // op andeer manier het object van de discogs inzetten waarbij je waarschijnlijk onder "thumb" te vinden is {
    //   "pagination": {
    //     "per_page": 50,
    //     "items": 9,
    //     "page": 1,
    //     "urls": {},
    //     "pages": 1
    //   },
    //   "releases": [
    //     {
    //       "artist": "Nickelback",
    //       "id": 173765,
    //       "main_release": 3128432,
    //       "resource_url": "http://api.discogs.com/masters/173765",
    //       "role": "Main",
    //       "thumb": "https://api-img.discogs.com/lb0zp7--FLaRP0LmJ4W6DhfweNc=/fit-in/90x90/filters:strip_icc():format(jpeg):mode_rgb()/discogs-images/R-5557864-1396493975-7618.jpeg.jpg",
    //       "title": "Curb",
    //       "type": "master",
    //       "year": 1996
    //     },
    //     {
    //       "artist": "Nickelback",
    //       "format": "CD, EP",
    //       "id": 4299404,
    //       "label": "Not On Label (Nickelback Self-released)",
    //       "resource_url": "http://api.discogs.com/releases/4299404",
    //       "role": "Main",
    //       "status": "Accepted",
    //       "thumb": "https://api-img.discogs.com/eFRGD78N7UhtvRjhdLZYXs2QJXk=/fit-in/90x90/filters:strip_icc():format(jpeg):mode_rgb()/discogs-images/R-4299404-1361106117-3632.jpeg.jpg",
    //       "title": "Hesher",
    //       "type": "release",
    //       "year": 1996
    //     },
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





