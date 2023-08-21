import React, { useState, useEffect } from 'react';

const BackendTestComponent = () => {
    const [backendData, setBackendData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://frontend-educational-backend.herokuapp.com/api/test/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBackendData(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    return (
        <div>
            {backendData ? (
                <div>
                    <h2>Backend Response:</h2>
                    <pre>{JSON.stringify(backendData, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default BackendTestComponent;
