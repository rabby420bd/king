const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

// Utility functions for Bengali numeral conversion
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

const convertTo12HourWithBengaliNumerals = (time) => {
  const [hour, minutes] = time.split(":").map(Number);
  const isPM = hour >= 12;
  const convertedHour = convertToBengaliNumerals(isPM && hour > 12 ? hour - 12 : hour || 12);
  const convertedMinutes = convertToBengaliNumerals(minutes);
  const amPm = isPM ? "PM" : "AM";
  return `${convertedHour}:${convertedMinutes} ${amPm}`;
};

router.get("/", async (req, res) => {
  const url = "http://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=4";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const timings = data.data.timings;
    for (const [key, value] of Object.entries(timings)) {
      timings[key] = convertTo12HourWithBengaliNumerals(value);
    }
    data.data.timings = timings;

    res.json(data);
  } catch (error) {
    console.error("Error fetching timings:", error);
    res.status(500).json({ error: "Failed to fetch timings." });
  }
});

module.exports = router;
