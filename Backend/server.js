const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const clientId = process.env.CLIENT_ID; // Your Client ID
const clientSecret = process.env.CLIENT_SECRET; // Your Client Secret
const redirectUri = 'http://172.25.176.1:3001'; // Your redirect URI

app.use(cors());

app.get('/login', (req, res) => {
    const scope = 'playlist-modify-public playlist-modify-private user-read-private user-read-email';
    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;

    try {
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
        console.log('Access Token:', accessToken);
        res.redirect('http://localhost:3000'); // Redirect to your frontend
    } catch (error) {
        console.error('Error obtaining access token:', error);
        res.status(500).send('Error obtaining access token');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
