import axios from "axios";
import './OurSounds.css'

export default function OurSounds() {

    /*
    * sounds ophalen met API
    * we halen de return uit elkaar met 10 nummers
    * dat stoppen we in de pagina
    * */



    async function getApiTracks() {
       try {const response = await axios.get('http://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${token}&format=json`;\n' +
            '            const response = await axios.get(url);');console.log(response.data);
       } catch (error) {
            console.error(error);
    }
    }

    return (
        <>
            <div className="background-container">
                <ol>
                    <li className='list-items'> 1</li>
                    <li className="list-items"> 2</li>
                    <li className='list-items'> 3</li>
                    <li className='list-items'> 4</li>
                    <li className='list-items'> 5</li>
                    <li className='list-items'> 6</li>
                    <li className='list-items'> 7</li>
                    <li className='list-items'> 8</li>
                    <li className='list-items'> 9</li>
                    <li className='list-items'> 10</li>
                </ol>
                <div className="position-button">
                    <button className="button-logout" onClick={getApiTracks}>uitloggen</button>
                </div>
            </div>
        </>

    )
}