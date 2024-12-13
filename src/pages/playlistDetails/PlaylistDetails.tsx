import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";


interface Playlist {
    id: string;
    name: string;
    description: string;
    images: { url: string }[];
    tracks: { items: { track: { name: string } }[] };
}


function PlaylistDetails() {
    const { id } = useParams<{ id: string }>();
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const accessToken = localStorage.getItem("spotifyAccessToken");

    useEffect(() => {
        if (accessToken) {
            fetch(`https://api.spotify.com/v1/playlists/${id}`, {
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
                .then(data => setPlaylist(data))
                .catch(error => setError(error.message))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [accessToken, id]); // If this changes, the effect will run again

    if (loading) {
        return null; // We could display a loading screen here but loading is too fast to be noticeable
    }

    if (error) {
        return <p className="text-red-400">{error}</p>;
    }

    if (!playlist) {
        return <p className="text-red-400">Playlist not found</p>;
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl text-green-400 font-bold">{playlist.name}</h1>
            {playlist.images.length > 0 && (
                <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="w-64 h-64 rounded object-cover"
                />
            )}
            <p className="text-lg text-gray-200">{playlist.description}</p>
            <h2 className="text-2xl text-gray-200 mt-4">Tracks</h2>

            <ul>
                {playlist.tracks.items.map((item, index) => (
                    <li key={index} className="text-lg text-gray-200">
                        {item.track.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlaylistDetails;