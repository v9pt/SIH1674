"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const main_1 = require("./main"); // Import the MongoDB utility function
const app = (0, express_1.default)();
const PORT = 3001; // Instagram Scraper Port
app.use(express_1.default.json());
app.post('/scrape', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hashtags } = req.body;
    const endpoint = 'https://api.apify.com/v2/acts/apify~instagram-hashtag-scraper/run-sync-get-dataset-items?token=apify_api_6itjQme3ye938bZsnmRag7GWNHsF7d2sbNFY';
    const data = {
        hashtags,
        resultsLimit: 1
    };
    try {
        console.log('Instagram scraper initiated...');
        const response = yield axios_1.default.post(endpoint, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const items = response.data;
        // Insert data into MongoDB
        for (const hashtag of hashtags) {
            yield (0, main_1.insertInstagram)(hashtag, items);
        }
        res.json({ message: 'Data successfully inserted into MongoDB' });
    }
    catch (error) {
        // Type assertion to handle error safely
        if (axios_1.default.isAxiosError(error)) {
            // Axios-specific error handling
            console.error('Error scraping Instagram:', error.response ? error.response.data : error.message);
            res.status(500).send('Error scraping Instagram');
        }
        else {
            // Generic error handling
            console.error('Unknown error:', error);
            res.status(500).send('Unknown error occurred');
        }
    }
}));
app.listen(PORT, () => {
    console.log(`Instagram scraper listening on port ${PORT}`);
});
