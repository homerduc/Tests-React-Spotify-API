//import './Home.css'
import React, {useEffect, useState} from 'react';


function Home() {
    const [userData, setUserData] = useState<{ display_name: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // To avoid flickering (flash)
    const accessToken = localStorage.getItem("spotifyAccessToken");

    useEffect(() => {
        if (accessToken) {
            fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`)
                    }
                    return response.json()
                })
                .then((data) => setUserData(data))
                .catch((error) => console.error("Error when fetching user data", error))
                .finally(() => setLoading(false)); // Stop loading
        } else {
            setLoading(false); // If no access token, stop loading
        }
    }, [accessToken]);

    if (loading) {
        return null; // We could display a loading screen here but loading is too fast to be noticeable
    }

    return (
        <div>
            <h2 className="text-3xl underline text-green-400 flex justify-center">Home</h2>
            {userData ? (

                <div>
                    <h2 className="text-2xl flex justify-center font-bold m-4 text-gray-200">Welcome, {userData.display_name}</h2>
                </div>

            ) : (
                <p>Log in to see your Spotify data</p>
            )}
        </div>
    );
}

export default Home;
