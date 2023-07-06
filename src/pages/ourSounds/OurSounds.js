import axios from "axios";

export default function OurSounds() {

    /*
    * sounds ophalen met API
    * we halen de return uit elkaar met 10 nummers
    * dat stoppen we in de pagina
    * */

    async function getApiData() {

        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {
                q: '<REQUIRED>',
                type: 'multi',
                offset: '0',
                limit: '10',
                numberOfTopResults: '5'
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

    async function getApiTracks() {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/tracks/',
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
            <h1>Mijn Top 10</h1>
            <button className="button" onClick={getApiTracks}></button>
        </>
    )
}