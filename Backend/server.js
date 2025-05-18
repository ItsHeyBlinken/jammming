const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const clientId = process.env.CLIENT_ID; // Your Client ID
const clientSecret = process.env.CLIENT_SECRET; // Your Client Secret
const redirectUri = 'http://172.25.176.1:3000'; // Your redirect URI

app.get('/login', (req, res) => {
    const scope = 'playlist-modify-public playlist-modify-private user-read-private user-read-email';
    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;

    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const accessToken = tokenResponse.data.access_token;
    // You can now use the access token to make API requests
    console.log('Access Token:', accessToken);

    // Redirect to your frontend or send a response
    res.redirect('http://localhost:3000'); // Redirect to your frontend
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
