const axios = require('axios');

const emergencyBalance = async (req, res) => {
    const phoneNumber = req.query.phone;

    // Validate phone number
    const validPhoneRegex = /^(014|019)\d{8}$/;
    if (!phoneNumber || !validPhoneRegex.test(phoneNumber)) {
        return res.status(400).json({ error: 'Invalid phone number. Use only Banglalink numbers (014/019).' });
    }

    try {
        const apiUrl = `https://myblapi.banglalink.net/api/v1/emergency-balance/${encodeURIComponent(phoneNumber)}`;
        const response = await axios.get(apiUrl);

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch emergency balance', details: error.message });
    }
};

module.exports = emergencyBalance;
