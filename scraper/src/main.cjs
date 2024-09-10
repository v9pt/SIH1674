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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertInstagram = insertInstagram;
exports.insertMeta = insertMeta;
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://huzaifamullaug22:lmaoded69@sih.ihvem.mongodb.net/";
const client = new mongodb_1.MongoClient(uri);
function insertInstagram(collectionName, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const db = client.db('instagramDB');
            const collection = db.collection(collectionName);
            yield collection.insertMany(data);
            console.log(`Data successfully inserted into MongoDB collection: ${collectionName}`);
        }
        catch (error) {
            console.error('Error inserting data into MongoDB:', error);
        }
        finally {
            yield client.close();
        }
    });
}
function insertMeta(collectionName, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const db = client.db('metaDB');
            const collection = db.collection(collectionName);
            yield collection.insertMany(data);
            console.log(`Data successfully inserted into MongoDB collection: ${collectionName}`);
        }
        catch (error) {
            console.error('Error inserting data into MongoDB:', error);
        }
        finally {
            yield client.close();
        }
    });
}
