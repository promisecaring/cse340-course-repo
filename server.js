
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organization-model.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve CSS and images from the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Home route
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// Organizations route
app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();

    res.render('organizations', {
        title: 'Our Partner Organizations',
        organizations
    });
});

// Projects route
app.get('/projects', async (req, res) => {
    const projects = await getAllProjects();

    console.log('Service Projects Retrieved:', projects.length);

    res.render('projects', {
        title: 'Service Projects',
        projects
    });
});


// Categories route
app.get('/categories', async (req, res) => {
    const categories = await getAllCategories();

    res.render('categories', {
        title: 'Service Project Categories',
        categories
    });
});

// Start the server
app.listen(PORT, async () => {
    try {
        await testConnection();

        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);

    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});
