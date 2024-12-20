const axios = require('axios');

const nagadhalf = async (req, res) => {
    const msisdn = req.query.msisdn;

    if (!msisdn) {
        return res.status(400).json({ error: 'msisdn parameter is required.' });
    }

    const apiUrl = `https://app.mynagad.com:20002/api/user/check-user-status-for-log-in?msisdn=${encodeURIComponent(msisdn)}`;

    const headers = {
        "X-KM-User-AspId": "100012345612345",
        "X-KM-User-Agent": "ANDROID/1152",
        "X-KM-DEVICE-FGP": "19DC58E052A91F5B2EB59399AABB2B898CA68CFE780878C0DB69EAAB0553C3C6",
        "X-KM-Accept-language": "bn",
        "X-KM-AppCode": "01"
    };

    try {
        const response = await axios.get(apiUrl, { headers });
        res.json(response.data); // Return the API response
    } catch (error) {
        console.error('Error fetching Nagad User Status:', error.message);
        res.status(500).json({ error: 'Failed to fetch Nagad user status.', details: error.message });
    }
};

module.exports = nagadhalf;
