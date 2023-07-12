import axios from "axios";
import './OurSounds.css'

export default function OurSounds() {

    /*
    * sounds ophalen met API
    * we halen de return uit elkaar met 10 nummers
    * dat stoppen we in de pagina
    * */



    async function getApiTracks() {
        const options = {
            method: 'GET',
            url: "",
            params: {
                ids: '4WNcduiCmDNfmTEz7JvmLv'
            },
            headers: {
                'X-RapidAPI-Key': '19f26934fcmsh367906a66bf7580p16dde5jsn3f029566ed3a',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
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