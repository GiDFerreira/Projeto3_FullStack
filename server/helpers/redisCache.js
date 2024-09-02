// redisClient.js
const { createClient } = require('redis');

async function createRedisClient() {
    const client = createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();  

    return client; 
}


const redisCache = createRedisClient();

module.exports = redisCache;
