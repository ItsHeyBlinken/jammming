import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
// import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
import Tracklist from './components/Tracklist';
import Spotify from './Spotify'; // Import the Spotify module

const tracks = [
    { id: 1, name: "Song One", artist: "Artist A", album: "Album X" },
    { id: 2, name: "Song Two", artist: "Artist B", album: "Album Y" },
    { id: 3, name: "Song Three", artist: "Artist C", album: "Album Z" },
];

const mockPlaylistTracks = [
    { id: 1, name: "Playlist Song One", artist: "Artist A", album: "Album X", uri: "spotify:track:1" },
    { id: 2, name: "Playlist Song Two", artist: "Artist B", album: "Album Y", uri: "spotify:track:2" },
];

const App = () => {
    const [searchResults, setSearchResults] = useState(tracks);
    const [playlistName, setPlaylistName] = useState("My Playlist");
    const [playlistTracks, setPlaylistTracks] = useState(mockPlaylistTracks);

    useEffect(() => {
        const token = Spotify.getAccessToken(); // Get the access token
        console.log("Access Token:", token); // For testing, log the token
    }, []);

    const handleSearch = (searchTerm) => {
        // Logic to fetch search results from Spotify API
        // For now, you can just set it to the hard-coded tracks
        setSearchResults(tracks); // This will update the state with the tracks
    };


    const handleAddTrackToPlaylist = (track) => {
        // Check if the track is already in the playlist
        const isTrackInPlaylist = playlistTracks.some(playlistTrack => playlistTrack.id === track.id);
        
        if (!isTrackInPlaylist) {
            // If the track is not in the playlist, add it
            setPlaylistTracks(prevTracks => [...prevTracks, track]);
        }
    };

    const handleRemoveTrackFromPlaylist = (track) => {
        // Filter out the track that needs to be removed
        const updatedPlaylistTracks = playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
        setPlaylistTracks(updatedPlaylistTracks); // Update the state with the new playlist
    };

    const handleChangePlaylistName = (newName) => {
        setPlaylistName(newName); // This will update the playlist name
    };

    const handleSavePlaylist = () => {
        // Create an array of URIs from the playlist tracks
        const trackURIs = playlistTracks.map(track => track.uri); // Assuming each track has a uri property

        // Mock saving process (you can replace this with actual API call later)
        console.log("Saving playlist with the following URIs:", trackURIs);

        // Reset the playlist after saving
        setPlaylistTracks([]);
        setPlaylistName("My Playlist"); // Reset to default name or any other logic you want
    };

    const handleLogin = () => {
        window.location.href = 'http://localhost:3001/login'; // Redirect to your backend login route
    };

    return (
        <div>
            <h1>Jammming</h1>
            <button onClick={handleLogin}>Login with Spotify</button>
            <SearchBar onSearch={handleSearch} />
            <Tracklist tracks={searchResults} onAdd={handleAddTrackToPlaylist} onRemove={handleRemoveTrackFromPlaylist} />
            <Playlist 
                name={playlistName} 
                tracks={playlistTracks} 
                onRemove={handleRemoveTrackFromPlaylist} 
                onChangeName={handleChangePlaylistName}
            />
            <button onClick={handleSavePlaylist}>Save To Spotify</button>
        </div>
    );
};

export default App;
