const clientId = 'a27c9c83f31246d38d0acee7bb05cda9'; // Replace with your Client ID
const redirectUri = 'http://172.25.176.1:3000'; // Use your network IP address
const scopes = [
    'playlist-modify-public',
    'playlist-modify-private',
    'user-read-private',
    'user-read-email',
];

let accessToken;
let tokenExpiration;

const Spotify = {
    getAccessToken() {
        // Check if we already have an access token
        if (accessToken && Date.now() < tokenExpiration) {
            return accessToken; // Return the token if it's still valid
        }

        // Check for access token in URL
        const urlParams = new URLSearchParams(window.location.hash);
        const token = urlParams.get('access_token');
        const expiresIn = urlParams.get('expires_in');

        if (token) {
            accessToken = token;
            tokenExpiration = Date.now() + expiresIn * 1000; // Set expiration time
            window.setTimeout(() => (accessToken = ''), expiresIn * 1000); // Clear token after expiration
            window.history.pushState({}, document.title, window.location.pathname); // Clear URL parameters
            return accessToken;
        } else {
            // If no token, redirect to Spotify authorization
            const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}`;
            window.location = authUrl; // Redirect to Spotify login
        }
    },
};

export default Spotify;
