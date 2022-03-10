import * as db from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ url }) => {
    const search = url.searchParams.get('search') || ''
	const keys = await db.games()

    const games = [];
    let categories;
    for (const name of keys) {
        categories = await db.gameCategories(name)
        if (search && !categories.includes(search)) {
            continue;
        }

        games.push({name, categories})
    }

    return {
        body: {
            games,
            search,
            categories: await db.categories(),
        },
    };
};

export const post: RequestHandler = async ({ request }) => {
    const form = await request.formData();

    db.createGame(form.get('game'));

    return {};
};

export const patch: RequestHandler = async ({ request }) => {
	const form = await request.formData();

	db.addGameCategory(form.get('game'), form.get('category'))

	return {
        status: 303,
        headers: {
            location: '/'
        }
    };
};

export const del: RequestHandler = async ({ request }) => {
	const form = await request.formData();

    db.removeGameCategory(form.get('game'), form.get('category'))

    return {
        status: 303,
        headers: {
            location: '/'
        }
    };
};
