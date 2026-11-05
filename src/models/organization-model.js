import { db } from './db.js';

// Get all organizations from the database
export async function getAllOrganizations() {
    try {
        const result = await db.query(
            'SELECT * FROM organization ORDER BY organization_id'
        );

        return result.rows;
    } catch (error) {
        console.error('Error retrieving organizations:', error);
        throw error;
    }
}