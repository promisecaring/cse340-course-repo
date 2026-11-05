
import { db } from './db.js';

// Get all service projects with their organization names
export async function getAllProjects() {
    try {
        const result = await db.query(
            `SELECT
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
            ORDER BY service_project.project_date`
        );

        return result.rows;
    } catch (error) {
        console.error('Error retrieving service projects:', error);
        throw error;
    }
}
