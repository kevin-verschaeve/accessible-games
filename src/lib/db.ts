import Redis from 'ioredis'

let client = new Redis(import.meta.env.VITE_REDIS_URL || process.env.REDIS_URL);

const CATEGORIES :string = 'categories'

export const games = () => client.keys('http*')
export const categories = () => client.smembers(CATEGORIES)

export const createGame = (game :string) => client.sadd(game, "_")
export const deleteGame = (game :string) => client.del(game)

export const gameCategories = (game :string) => client.smembers(game).then(categories => categories.filter(category => category !== "_"))

export const createCategory = (category :string) => client.sadd(CATEGORIES, category)
export const deleteCategory = (category :string) => client.srem(CATEGORIES, category)

export const addGameCategory = (game :string, category :string) => client.sadd(game, category)
export const removeGameCategory = (game :string, category :string) => client.srem(game, category)
