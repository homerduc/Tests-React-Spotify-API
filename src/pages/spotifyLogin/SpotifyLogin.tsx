const clientId = "20ff08bc03f0408ab60988183f660959";
const redirectUri = "http://localhost:3000/callback";
const scopes = ["user-read-private", "user-read-email", "user-library-read"];

const SpotifyLogin = () => {
    const handleLogin = () => {
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join("%20")}`;
    }

    return (
        <button onClick={handleLogin} className="bg-green-500 text-white p-2 rounded">
            Login with Spotify
        </button>
    );
}

export default SpotifyLogin;

