//import './Home.css'
import React, { useEffect, useState } from 'react';


function Home() {
    const [userData, setUserData] = useState<{ display_name: string } | null>(null);
    const accessToken = localStorage.getItem("spotifyAccessToken");

    useEffect(() => {
        console.log(accessToken);
        if (accessToken) {
            fetch("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            })
                .then((response) => response.json())
                .then((data) => setUserData(data))
                .catch((error) => console.error(error));
        }
    }, [accessToken]);

  return (
      <div>
        <h2 className="text-3xl underline text-green-400 flex justify-center">Home</h2>
          {userData ? (
              <div>
                  <h2 className="text-2xl flex justify-center">Welcome, {userData.display_name}</h2>
              </div>
              ) : (
                  <p>Log in to see your Spotify data</p>
              )}
      </div>
  );
}

export default Home;
