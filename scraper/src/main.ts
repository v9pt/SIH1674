import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://huzaifamullaug22:lmaoded69@sih.ihvem.mongodb.net/";
const client = new MongoClient(uri);

export async function insertInstagram(collectionName: string, data: any[]) {
    try {
        await client.connect();
        const db = client.db('instagramDB'); 
        const collection = db.collection(collectionName);
        await collection.insertMany(data);
        console.log(`Data successfully inserted into MongoDB collection: ${collectionName}`);
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
    } finally {
        await client.close();
    }
}

export async function insertMeta(collectionName: string, data: any[]) {
    try {
        await client.connect();
        const db = client.db('metaDB'); 
        const collection = db.collection(collectionName);
        await collection.insertMany(data);
        console.log(`Data successfully inserted into MongoDB collection: ${collectionName}`);
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
    } finally {
        await client.close();
    }
}
