const { createClient } = require('redis');

async function createRedisClient() {
    const client = createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));

    try {
        await client.connect();  
        console.log('Redis Client Connected Successfully');
    } catch (err) {
        console.error('Error connecting to Redis', err);
    }

    return client; 
}


const redisCache = createRedisClient();

module.exports = redisCache;
