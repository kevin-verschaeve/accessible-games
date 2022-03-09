import { db } from '$lib/function';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	const response = await db.json()

    return {
        body: { response }
    };
};
