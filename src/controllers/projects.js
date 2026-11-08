
 // Import the projects model functions
import {
    getAllProjects,
    getProjectDetails
} from '../models/projects.js';

// Import the categories model function
import { getCategoriesByProjectId } from '../models/categories.js';

// Display all service projects
const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const title = 'Service Projects';

    res.render('projects', { title, projects });
};

// Display details for one service project
const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        // Retrieve project details
        const projectDetails = await getProjectDetails(projectId);

        // Handle a project that does not exist
        if (!projectDetails) {
            const error = new Error('Service project not found');
            error.status = 404;
            return next(error);
        }

        // Retrieve categories belonging to this project
        const categories = await getCategoriesByProjectId(projectId);

        const title = 'Service Project Details';

        res.render('project', {
            title,
            projectDetails,
            categories
        });
    } catch (error) {
        next(error);
    }
};

// Export controller functions
export {
    showProjectsPage,
    showProjectDetailsPage
};
