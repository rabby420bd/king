const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/timings", async (req, res) => {
  const url = "http://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=4";

  try {
    // Fetch JSON data from the API
    const response = await fetch(url);
    const data = await response.json();

    // Function to convert numbers to Bengali numerals
    const convertToBengaliNumerals = (number) => {
      const bengaliNumerals = {
        "0": "০",
        "1": "১",
        "2": "২",
        "3": "৩",
        "4": "৪",
        "5": "৫",
        "6": "৬",
        "7": "৭",
        "8": "৮",
        "9": "৯",
      };
      return number.toString().replace(/[0-9]/g, (digit) => bengaliNumerals[digit]);
    };

    // Function to convert 24-hour format to 12-hour AM/PM format with Bengali numerals
    const convertTo12HourWithBengaliNumerals = (time) => {
      const [hour, minutes] = time.split(":").map(Number);
      const isPM = hour >= 12;
      const convertedHour = convertToBengaliNumerals(isPM && hour > 12 ? hour - 12 : hour || 12);
      const convertedMinutes = convertToBengaliNumerals(minutes);
      const amPm = isPM ? "PM" : "AM";
      return `${convertedHour}:${convertedMinutes} ${amPm}`;
    };

    // Convert timings to 12-hour format with Bengali numerals and AM/PM
    const timings = data.data.timings;
    for (const [key, value] of Object.entries(timings)) {
      timings[key] = convertTo12HourWithBengaliNumerals(value);
    }

    // Update the response with converted timings
    data.data.timings = timings;

    // Send updated JSON response
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
