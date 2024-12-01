import {useEffect, useState} from "react";

const clientId = "20ff08bc03f0408ab60988183f660959";
const redirectUri = `${window.location.origin}/callback`;
const scopes = ["user-read-private", "user-read-email", "user-library-read"];

const SpotifyLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("spotifyAccessToken");
        if (accessToken) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join("%20")}`;
    }

    if (isLoggedIn) {
        return (
            <div>
                <h2 className="text-3xl font-bold text-green-400 flex justify-center">Spotify Login</h2>
                <p className="text-2xl font-bold m-4 text-gray-200 flex justify-center">You are logged in</p>
                <div className="flex justify-center">
                    <button onClick={() => {
                        localStorage.removeItem("spotifyAccessToken");
                        setIsLoggedIn(false);
                    }
                    } className="bg-red-500 text-white p-2 rounded-full">
                        Logout
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            !isLoggedIn && (
                <button onClick={handleLogin} className="bg-green-500 text-white p-2 rounded">
                    Login with Spotify
                </button>
            )
        );
    }


}

export default SpotifyLogin;

