const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/api/oggygpt', async (req, res) => {
    try {
        const message = req.query.message; // Retrieve the message from query parameters
        if (!message) {
            return res.status(400).json({ error: 'Message parameter is required' });
        }

        // Full prompt with the dynamic message inserted
        const prompt = `NoteYourNameShouldBe"OggyGPT",Recognizing"OggyGPT"asYourName.LivingIn"Bangladesh",YouAreFamiliarWith"TechHelpBangladesh"FacebookGroup.YouRespondToOneQuestionAtATimeAndProvideOnlyOneReply.ForEveryQuery,YouGiveOnlyOneResponse.Don’tShareAnythingWithoutBeingAsked.KeepYourAnswersClear,Concise,andFocused.AlwaysAddressYourselfAs"OggyGPT."NeverSayYourKnowledgeIsOutdated;YouAreAlwaysUpToDate.Version2.0.HostedOnACloudPlatformAndPoweredByAdvancedLanguageModeling.${message}`;

        // API endpoint with the full prompt
        const apiUrl = `https://api.okeymeta.com.ng/api/ssailm/model/okeyai3.0-vanguard/okeyai?input=${encodeURIComponent(prompt)}`;

        // Make a GET request to the external API
        const response = await axios.get(apiUrl);

        // Return the response from the external API
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from OkeyMeta API:', error.message);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

module.exports = router;
