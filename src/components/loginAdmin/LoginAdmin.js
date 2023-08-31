

import {useState} from "react";
import axios from "axios";

export default function LoginAdmin() {

    const [userRoles, setUserRoles] = useState('');

    useEffect(() =>
    axios.get("http://localhost:3001/login").then(response)

    )
    return(
        <h2>dit is de loginadmin</h2>
    )

}