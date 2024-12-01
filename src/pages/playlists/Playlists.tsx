import React, {useEffect, useState} from 'react';

interface Playlist {
    id: string;
    name: string;
    description: string;
    images: { url: string }[];
}

function Playlists() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const accessToken = localStorage.getItem("spotifyAccessToken");

    useEffect(() => {
        if (accessToken) {
            fetch("https://api.spotify.com/v1/me/playlists", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => setPlaylists(data.items))
                .catch(error => setError(error.message))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [accessToken]);

    if (loading) {
        return null; // We could display a loading screen here but loading is too fast to be noticeable
    }

    if (error) {
        return <p className="text-red-400">{error}</p>;
    }

    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-3xl text-green-400 font-bold flex justify-center">Your public playlists</h1>
            {playlists.length > 0 ? (
                <ul>
                    {playlists.map((playlist => (
                        playlist && ( // Check if playlist is not null, it is when the page is first loaded
                            <li key={playlist.id} className="mb-4 flex justify-center">
                                <div className="flex-col flex items-center m-3">
                                    {playlist.images.length > 0 && (
                                        <img
                                            src={playlist.images[0].url}
                                            alt={playlist.name}
                                            className="w-28 h-28 rounded object-cover"
                                        />
                                    )}
                                    <span className="text-2xl text-gray-200">{playlist.name}</span>
                                </div>
                            </li>
                        )
                    )))}
                </ul>
            ) : (
                <h2 className="text-2xl flex justify-center font-bold m-4 text-gray-200">No playlists found</h2>
            )}
        </div>
    );
}

export default Playlists;