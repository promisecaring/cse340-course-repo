
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

// Get all projects belonging to a specific organization
export async function getProjectsByOrganizationId(organizationId) {
    try {
        const query = `
            SELECT
                project_id,
                organization_id,
                title,
                description,
                location,
                project_date
            FROM service_project
            WHERE organization_id = $1
            ORDER BY project_date;
        `;

        const queryParams = [organizationId];
        const result = await db.query(query, queryParams);

        return result.rows;
    } catch (error) {
        console.error('Error retrieving projects by organization:', error);
        throw error;
    }
}

// Get details of one service project
export async function getProjectDetails(projectId) {
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
            WHERE service_project.project_id = $1;
        `;

        const queryParams = [projectId];
        const result = await db.query(query, queryParams);

        return result.rows[0];
    } catch (error) {
        console.error('Error retrieving project details:', error);
        throw error;
    }
}
