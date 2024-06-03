import { createClient } from 'redis'

const redisUrl = 'redis://localhost:6379'

const redisClient = createClient({
    url: redisUrl,
})

const connectRedis = async () => {
    try {
        await redisClient.connect()
        console.log('Redis client connected successfully')
        redisClient.set('try', 'Hello Welcome')
    } catch (error) {
        console.log('Failed to connect to Redis:', error)
        setTimeout(connectRedis, 5000)
    }
}

redisClient.on('error', (err) => {
    console.error('Redis error:', err)
})

redisClient.on('connect', () => {
    console.log('Attempting to connect to Redis...')
})

redisClient.on('ready', () => {
    console.log('Redis client is ready')
})

redisClient.on('end', () => {
    console.log('Redis connection closed')
})

redisClient.on('reconnecting', () => {
    console.log('Reconnecting to Redis...')
})


connectRedis()

export default redisClient
