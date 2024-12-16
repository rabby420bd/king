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
    return `${convertToBengaliNumerals(adjustedHour)}:${convertToBengaliNumerals(minutes)} ${amPm}`;
}

const timingsByCity = async (req, res) => {
    const city = req.query.city || 'Dhaka';
    const country = req.query.country || 'Bangladesh';
    const method = req.query.method || 4;

    try {
        const apiUrl = `http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;
        const response = await axios.get(apiUrl);

        const timings = response.data.data.timings;
        Object.keys(timings).forEach((key) => {
            timings[key] = convertTo12HourWithBengaliNumerals(timings[key]);
        });

        res.json({
            ...response.data,
            data: {
                ...response.data.data,
                timings,
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch prayer timings', details: error.message });
    }
};

module.exports = timingsByCity;
