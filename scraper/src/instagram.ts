import express from 'express';
import axios from 'axios';
import { insertInstagram } from './main.js'; // Import the MongoDB utility function

const app = express();
const PORT = 3001; // Instagram Scraper Port

app.use(express.json());

app.post('/scrape', async (req, res) => {
    const { hashtags } = req.body;
    const endpoint = 'https://api.apify.com/v2/acts/apify~instagram-hashtag-scraper/run-sync-get-dataset-items?token=apify_api_6itjQme3ye938bZsnmRag7GWNHsF7d2sbNFY';
    const data = {
        hashtags,
        resultsLimit: 1
    };

    try {
        console.log('Instagram scraper initiated...');
        const response = await axios.post(endpoint, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const items = response.data;
        
        // Insert data into MongoDB
        for (const hashtag of hashtags) {
            await insertInstagram(hashtag, items);
        }

        res.json({ message: 'Data successfully inserted into MongoDB' });
    } catch (error) {
        // Type assertion to handle error safely
        if (axios.isAxiosError(error)) {
            // Axios-specific error handling
            console.error('Error scraping Instagram:', error.response ? error.response.data : error.message);
            res.status(500).send('Error scraping Instagram');
        } else {
            // Generic error handling
            console.error('Unknown error:', error);
            res.status(500).send('Unknown error occurred');
        }
    }
});

app.listen(PORT, () => {
    console.log(`Instagram scraper listening on port ${PORT}`);
});
