
// Import the categories model functions
import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
} from '../models/categories.js';

// Display all categories
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

// Display details for one category
const showCategoryDetailsPage = async (req, res, next) => {
    try {
        const categoryId = req.params.id;

        // Retrieve the category details
        const categoryDetails = await getCategoryById(categoryId);

        // Handle a category that does not exist
        if (!categoryDetails) {
            const error = new Error('Category not found');
            error.status = 404;
            return next(error);
        }

        // Retrieve all projects belonging to this category
        const projects = await getProjectsByCategoryId(categoryId);

        const title = 'Category Details';

        res.render('category', {
            title,
            categoryDetails,
            projects
        });
    } catch (error) {
        next(error);
    }
};

// Export both controller functions
export {
    showCategoriesPage,
    showCategoryDetailsPage
};
