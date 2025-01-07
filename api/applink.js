const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const phone = req.query.phone; // Retrieve the phone number from the query parameters
        if (!phone) {
            return res.status(400).json({ error: 'Phone number is required' });
        }

        const url = 'https://applink.com.bd/appstore-v4-server/login/otp/request';
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://applink.com.bd/',
            'Content-Type': 'application/json',
            'Origin': 'https://applink.com.bd',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
        };

        const data = {
            msisdn: `88${phone}`,
        };

        const response = await axios.post(url, data, { headers });
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

module.exports = router;
