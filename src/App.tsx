import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';

function App() {
    return (
        <Router>
            <header>
                <nav className="bg-gray-800 p-4 font-medium flex justify-center">
                    <ul className="flex space-x-4">
                        <li className="text-white hover:text-gray-400">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="text-white hover:text-gray-400">
                            <Link to="about">About</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="flex-grow">
                <div className="p-4 flex flex-col min-h-screen">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="about" element={<About/>}/>
                    </Routes>
                </div>

            </main>

            <footer className="bg-gray-800 p-4 text-white text-center">
                <p>Footer</p>
            </footer>
        </Router>
    );
}

export default App;
