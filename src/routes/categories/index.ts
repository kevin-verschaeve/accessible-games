import * as db from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ request }) => {
    const form = await request.formData();

    db.createCategory(form.get('category'));
    
    return {
        status: 303,
        headers: {
            location: '/'
        }
    };
};
