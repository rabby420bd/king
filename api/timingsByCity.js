const axios = require('axios');

// Function to convert numbers to Bengali numerals
function convertToBengaliNumerals(number) {
    const bengaliNumerals = {
        '0': '০',
        '1': '১',
        '2': '২',
        '3': '৩',
        '4': '৪',
        '5': '৫',
        '6': '৬',
        '7': '৭',
        '8': '৮',
        '9': '৯',
    };
    return number.toString().replace(/[0-9]/g, (digit) => bengaliNumerals[digit]);
}

// Function to convert 24-hour format to 12-hour AM/PM format with Bengali numerals
function convertTo12HourWithBengaliNumerals(time) {
    const [hour, minutes] = time.split(':').map(Number);
    const amPm = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

    return `${convertToBengaliNumerals(adjustedHour)}:${convertToBengaliNumerals(
        minutes
    )} ${amPm}`;
}

// Function to handle the API request
const timingsByCity = async (req, res) => {
    try {
        const city = req.query.city || 'Dhaka';
        const country = req.query.country || 'Bangladesh';
        const method = req.query.method || 4;

        const url = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;

        // Fetch prayer timings from the API
        const response = await axios.get(url);

        // Process timings to convert them
        const timings = response.data.data.timings;
        Object.keys(timings).forEach((key) => {
            timings[key] = convertTo12HourWithBengaliNumerals(timings[key]);
        });

        // Send back the updated response
        const updatedResponse = {
            ...response.data,
            data: {
                ...response.data.data,
                timings,
            },
        };

        res.json(updatedResponse);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
};

module.exports = timingsByCity;
