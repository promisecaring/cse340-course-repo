import { db } from './db.js';

// Get all categories with their related service projects
export async function getAllCategories() {
    try {
        const result = await db.query(`
            SELECT
                c.category_id,
                c.name,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'project_id', sp.project_id,
                            'title', sp.title
                        )
                    ) FILTER (WHERE sp.project_id IS NOT NULL),
                    '[]'
                ) AS projects
            FROM category c
            LEFT JOIN project_category pc
                ON c.category_id = pc.category_id
            LEFT JOIN service_project sp
                ON pc.project_id = sp.project_id
            GROUP BY c.category_id, c.name
            ORDER BY c.category_id;
        `);

        return result.rows;
    } catch (error) {
        console.error('Error retrieving categories and projects:', error);
        throw error;
    }
}