import Redis from 'ioredis'

let client = new Redis(import.meta.env.VITE_REDIS_URL || process.env.REDIS_URL);

export const games = () => client.keys('http*')

export const categories = () => client.smembers('categories')

export const createGame = (game) => client.sadd(game, "_")

export const removeGame = (game) => client.del(game)

export const gameCategories = (game) => client.smembers(game).then(categories => categories.filter(category => category !== "_"))

export const createCategory = (category) => client.sadd('categories', category)

export const addCategory = (game, category) => client.sadd(game, category)

export const deleteCategory = (category) => client.srem('categories', category)

export const removeCategory = (game, category) => client.srem(game, category)
