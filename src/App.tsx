import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import SpotifyLogin from "./pages/spotifyLogin/SpotifyLogin";
import Playlists from "./pages/playlists/Playlists";
import PlaylistDetails from "./pages/playlistDetails/PlaylistDetails";

import Callback from "./callback/Callback";

function App() {
    return (
        <Router>
            <header>
                <nav className="bg-[#080404] p-4 font-medium flex justify-center">
                    <ul className="flex space-x-6 text-gray-200">
                        <li className="hover:text-gray-400">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="hover:text-gray-400">
                            <Link to="about">About</Link>
                        </li>
                        <li className="hover:text-gray-400">
                            <Link to="playlists">Playlists</Link>
                        </li>
                        <li className="hover:text-gray-400">
                            <Link to="spotifyLogin">Spotify Login</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="flex-grow">
                <div className="p-4 flex flex-col min-h-screen bg-[#121212]">
                    <Routes> {/* All existing routes */}
                        <Route path="/" element={<Home/>}/>
                        <Route path="about" element={<About/>}/>
                        <Route path="spotifyLogin" element={<SpotifyLogin/>}/>
                        <Route path="playlists" element={<Playlists/>}/>
                        <Route path={"playlist/:id"} element={<PlaylistDetails/>}/> {/* Pour l'instant ça change rien */}

                        <Route path="callback" element={<Callback/>}/> {/* Route callback */}
                    </Routes>
                </div>
            </main>

            <footer className="bg-[#080404] p-4 text-gray-200 text-center">
                <p>Footer</p>
            </footer>
        </Router>
    );
}

export default App;
