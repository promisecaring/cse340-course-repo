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

// Get one organization by its ID
export async function getOrganizationDetails(organizationId) {
    try {
        const query = `
            SELECT
                organization_id,
                name,
                description,
                contact_email,
                logo_filename
            FROM organization
            WHERE organization_id = $1;
        `;

        const queryParams = [organizationId];
        const result = await db.query(query, queryParams);

        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error('Error retrieving organization details:', error);
        throw error;
    }
}