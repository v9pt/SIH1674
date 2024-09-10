import express from 'express';
import axios from 'axios';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json()); 

const endpoint = 'https://api.apify.com/v2/acts/apify~instagram-hashtag-scraper/run-sync-get-dataset-items?token=apify_api_6itjQme3ye938bZsnmRag7GWNHsF7d2sbNFY';


const uri = "mongodb+srv://huzaifamullaug22:sihprojecT.12@sih.ihvem.mongodb.net/";
const client = new MongoClient(uri);


async function scrapeAndStore(hashtag: string) {
    try {
        console.log(`Scraping for hashtag: ${hashtag}`);


        const data = {
            hashtags: [hashtag], 
            resultsLimit: 10 
        };


        const response = await axios.post(endpoint, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const items = response.data; 


        const keywords = ["ents", "shillong", "stash", "cannabis", "shrooms"];
        const filteredItems = items.filter((item: any) => {

            const caption = item.caption?.toLowerCase() || '';
            return keywords.some(keyword => caption.includes(keyword));
        });

        if (filteredItems.length === 0) {
            console.log('No relevant data found.');
            return;
        }


        await client.connect();
        const db = client.db('instagramDB');
        const collection = db.collection(hashtag); 


        await collection.insertMany(filteredItems);

        console.log(`Filtered data successfully inserted into MongoDB for hashtag: ${hashtag}`);
    } catch (error) {
        if (axios.isAxiosError(error)) {

            console.error('Axios error fetching data:', error.response ? error.response.data : error.message);
        } else {

            console.error('Unknown error:', error);
        }
    } finally {

        await client.close();
    }
}


app.post('/frontend/services/index.jsx', async (req, res) => {
    const { query } = req.body; 

    if (!query) {
        return res.status(400).send({ message: 'Query is required' });
    }


    await scrapeAndStore(query);

    res.send({ message: `Scraping initiated for hashtag: ${query}` });
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.get('/data/:hashtag', async (req, res) => {
    const { hashtag } = req.params;

    try {

        await client.connect();
        const db = client.db('instagramDB');
        const collection = db.collection(hashtag);


        const data = await collection.find({}).toArray();

        res.send(data);
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send({ message: 'Error fetching data' });
    } finally {

        await client.close();
    }
});

