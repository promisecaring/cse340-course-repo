
import { db } from './db.js';

// Get all categories
export async function getAllCategories() {
    try {
        const result = await db.query(
            `SELECT category_id, name
            FROM category
            ORDER BY name`
        );

        return result.rows;
    } catch (error) {
        console.error('Error retrieving categories:', error);
        throw error;
    }
}

// Get a single category by its ID
export async function getCategoryById(categoryId) {
    try {
        const query = `
            SELECT category_id, name
            FROM category
            WHERE category_id = $1;
        `;

        const queryParams = [categoryId];
        const result = await db.query(query, queryParams);

        return result.rows[0];
    } catch (error) {
        console.error('Error retrieving category by ID:', error);
        throw error;
    }
}

// Get all categories belonging to a specific project
export async function getCategoriesByProjectId(projectId) {
    try {
        const query = `
            SELECT
                category.category_id,
                category.name
            FROM category
            JOIN project_category
                ON category.category_id = project_category.category_id
            WHERE project_category.project_id = $1
            ORDER BY category.name;
        `;

        const queryParams = [projectId];
        const result = await db.query(query, queryParams);

        return result.rows;
    } catch (error) {
        console.error('Error retrieving categories by project:', error);
        throw error;
    }
}

// Get all projects belonging to a specific category
export async function getProjectsByCategoryId(categoryId) {
    try {
        const query = `
            SELECT
                service_project.project_id,
                service_project.organization_id,
                service_project.title,
                service_project.description,
                service_project.location,
                service_project.project_date,
                organization.name AS organization_name
            FROM service_project
            JOIN organization
                ON service_project.organization_id = organization.organization_id
            JOIN project_category
                ON service_project.project_id = project_category.project_id
            WHERE project_category.category_id = $1
            ORDER BY service_project.project_date;
        `;

        const queryParams = [categoryId];
        const result = await db.query(query, queryParams);

        return result.rows;
    } catch (error) {
        console.error('Error retrieving projects by category:', error);
        throw error;
    }
}
