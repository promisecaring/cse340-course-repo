
-- ========================================
-- Organization Table
-- ========================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert Sample Data: Organizations
-- ========================================

INSERT INTO organization
(name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);

-- ========================================
-- Service Projects Table
-- ========================================

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);


-- ========================================
-- Insert Sample Data: Service Projects
-- ========================================

INSERT INTO service_project
(organization_id, title, description, location, project_date)
VALUES

-- BrightFuture Builders
(1, 'Community School Renovation',
 'Renovate classrooms and improve learning facilities for local students.',
 'Ikeja, Lagos', '2026-11-15'),

(1, 'Community Road Improvement',
 'Repair damaged community roads to improve accessibility.',
 'Agege, Lagos', '2026-11-20'),

(1, 'Public Library Construction',
 'Support the construction of a community library for residents.',
 'Surulere, Lagos', '2026-11-25'),

(1, 'Safe Water Project',
 'Improve access to clean drinking water through community water facilities.',
 'Ikorodu, Lagos', '2026-12-02'),

(1, 'Community Housing Support',
 'Assist with improving housing conditions for vulnerable families.',
 'Mushin, Lagos', '2026-12-08'),

-- GreenHarvest Growers
(2, 'Community Garden Development',
 'Create a community garden where residents can grow fresh vegetables.',
 'Yaba, Lagos', '2026-11-16'),

(2, 'Urban Farming Workshop',
 'Teach residents practical urban farming and sustainable agriculture.',
 'Lekki, Lagos', '2026-11-22'),

(2, 'Tree Planting Initiative',
 'Plant trees to improve the environment and promote greener neighborhoods.',
 'Victoria Island, Lagos', '2026-11-28'),

(2, 'Food Sustainability Campaign',
 'Educate households about reducing food waste and sustainable food choices.',
 'Ajah, Lagos', '2026-12-04'),

(2, 'School Vegetable Garden',
 'Establish vegetable gardens in schools to encourage healthy eating.',
 'Badagry, Lagos', '2026-12-10'),

-- UnityServe Volunteers
(3, 'Community Park Cleanup',
 'Organize volunteers to remove waste and improve public recreational spaces.',
 'Maryland, Lagos', '2026-11-18'),

(3, 'Food Donation Drive',
 'Collect and distribute food supplies to families in need.',
 'Oshodi, Lagos', '2026-11-24'),

(3, 'Student Mentoring Program',
 'Connect volunteers with students for academic guidance and mentoring.',
 'Festac, Lagos', '2026-11-30'),

(3, 'Elderly Care Outreach',
 'Provide companionship and practical assistance to elderly residents.',
 'Apapa, Lagos', '2026-12-06'),

(3, 'Community Health Awareness',
 'Promote healthy living through community health education and awareness.',
 'Alimosho, Lagos', '2026-12-12');

