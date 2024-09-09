const { createClient } = require('redis');


let client;

async function createRedisClient() {
    client = createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));

    try {
        await client.connect();  
        console.log('Redis Client Connected Successfully');
    } catch (err) {
        console.error('Error connecting to Redis', err);
    }

    return client; 
}


createRedisClient();

module.exports = client;
