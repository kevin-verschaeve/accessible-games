import Redis from 'ioredis'

let client = new Redis(import.meta.env.VITE_REDIS_URL || process.env.REDIS_URL);

const CATEGORIES = 'categories'

export const games = () => client.keys('http*')
export const categories = () => client.smembers(CATEGORIES)

export const createGame = (game) => client.sadd(game, "_")
export const deleteGame = (game) => client.del(game)

export const gameCategories = (game) => client.smembers(game).then(categories => categories.filter(category => category !== "_"))

export const createCategory = (category) => client.sadd(CATEGORIES, category)
export const deleteCategory = (category) => client.srem(CATEGORIES, category)

export const addGameCategory = (game, category) => client.sadd(game, category)
export const removeGameCategory = (game, category) => client.srem(game, category)
