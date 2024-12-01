import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Callback: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        const tokenMatch = hash.match(/access_token=([^&]*)/);
        if (tokenMatch) {
            const accessToken = tokenMatch[1];
            localStorage.setItem("spotifyAccessToken", accessToken); // Save the token to local storage for later use
            window.location.hash = ""; // Clear URL
            navigate("/"); // Redirect to home page
        }
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <p>Logging in...</p>
        </div>
    );
};

export default Callback;