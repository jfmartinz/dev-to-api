const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins
app.use(
	cors({
		origin: 'https://www.jfmartinz.dev', // Only allow requests from your frontend
	})
);

app.get('/api/dev-blogs', async (req, res) => {
	const username = 'jfmartinz';
	const devToApiUrl = `https://dev.to/api/articles?username=${username}`;
	const devToApiKey = process.env.DEV_TO_API_KEY; // Loaded by Vercel

	try {
		const response = await axios.get(devToApiUrl, {
			headers: {
				'api-key': devToApiKey,
			},
		});
		res.json(response.data);
	} catch (error) {
		console.error('Error fetching from dev.to API:', error.message);
		res.status(500).json({ error: 'Failed to fetch articles' });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
